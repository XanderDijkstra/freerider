-- ============================================================================
-- FreeRider.no - demo seed data
-- Run AFTER migrations. Mirrors src/data/*.ts so the app shows the same
-- demo state with or without auth.
--
-- NOTE: auth users (profiles) must be created via Supabase Auth, not seeded
-- here. After signing up your admin and demo accounts, run the bottom
-- block to map them to the right roles/companies.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- companies
-- ----------------------------------------------------------------------------
insert into public.companies (id, slug, name, description, logo_color, fleet_size, locations, total_relocations, established, contact_email, contact_phone, status) values
  ('c-hertz', 'hertz', 'Hertz Norge', 'Hertz har 80 stasjoner i Norge og trenger jevnlig å balansere flåten mellom by og distrikt. Mest aktiv på ruten Oslo-Tromsø og Oslo-Bergen om sommeren.', '#FFCC00', 4200, '{Oslo,Bergen,Trondheim,Stavanger,Tromsø,Bodø,Ålesund}', 312, 1918, 'kontakt@hertz.no', '+47 21 00 00 00', 'approved'),
  ('c-avis',  'avis',  'Avis Norge',  'Avis har stort behov for å flytte EV-biler mellom by-stasjoner i sommerhalvåret. Tilbyr ofte fri leie med drivstoffkort på lange relokeringer.', '#D4002A', 2900, '{Oslo,Bergen,Trondheim,Kristiansand,Lillehammer}', 198, 1946, 'kontakt@avis.no', '+47 21 00 00 00', 'approved'),
  ('c-budget','budget','Budget Norge','Mindre flåte, men aktive i Sør-Norge. Tar ofte korte relokeringer mellom Oslo og Kristiansand.', '#FF7A00', 1100, '{Oslo,Kristiansand,Stavanger}', 76, 1958, 'kontakt@budget.no', '+47 21 00 00 00', 'approved'),
  ('c-sixt',  'sixt',  'Sixt Norge',  'Sixt har sterk premium- og EV-andel og legger jevnlig ut sjeldne biler (Polestar, Tesla, BMW iX) for relokering.', '#FF6600', 1800, '{Oslo,Bergen,Trondheim,Tromsø}', 142, 1912, 'kontakt@sixt.no', '+47 21 00 00 00', 'approved'),
  ('c-rentit','rent-it','Rent-it',    'Norsk regional aktør med fokus på Vestlandet og Nordvestlandet. Mye van og kombi for bobil-pendling.', '#0066B3', 480, '{Bergen,Ålesund,Molde,Førde}', 58, 2007, 'kontakt@rent-it.no', '+47 21 00 00 00', 'pending'),
  ('c-arctic','arctic-rental','Arctic Rental', 'Spesialiserer seg på Nord-Norge. Trenger å flytte biler tilbake sør etter turistsesongen.', '#005C8A', 320, '{Tromsø,Bodø,Alta,Kirkenes}', 41, 2014, 'kontakt@arcticrental.no', '+47 21 00 00 00', 'pending')
on conflict (id) do update set
  name = excluded.name,
  description = excluded.description,
  status = excluded.status;

-- ----------------------------------------------------------------------------
-- vehicles
-- ----------------------------------------------------------------------------
insert into public.vehicles (id, company_id, plate, make, model, year, type, fuel_type, transmission, seats, luggage, features, ev_range_km, photos) values
  ('v-1',  'c-hertz', 'EK 12345', 'Volkswagen', 'ID.4',          2024, 'suv',     'electric','automatic', 5, 543, '{AC,GPS,Bluetooth,Vinterdekk,Tilhengerfeste}', 520, '{#3A7D44}'),
  ('v-2',  'c-hertz', 'EK 22456', 'Toyota',     'Yaris',         2023, 'compact', 'hybrid',  'automatic', 5, 286, '{AC,GPS,Bluetooth,Vinterdekk}', null, '{#1F4D2B}'),
  ('v-3',  'c-avis',  'DR 91230', 'Tesla',      'Model Y',       2024, 'suv',     'electric','automatic', 5, 854, '{AC,GPS,Bluetooth,Vinterdekk,Autopilot,Tilhengerfeste}', 533, '{#A8D5A8}'),
  ('v-4',  'c-avis',  'DR 33871', 'Volvo',      'V60',           2023, 'wagon',   'diesel',  'automatic', 5, 529, '{AC,GPS,Bluetooth,Vinterdekk,Skiboks}', null, '{#5C6157}'),
  ('v-5',  'c-sixt',  'PD 55012', 'Polestar',   '2',             2024, 'sedan',   'electric','automatic', 5, 405, '{AC,GPS,Bluetooth,Vinterdekk,"Premium audio"}', 540, '{#3A7D44}'),
  ('v-6',  'c-sixt',  'PD 71204', 'BMW',        'iX',            2024, 'suv',     'electric','automatic', 5, 500, '{AC,GPS,Bluetooth,Vinterdekk,Skinnseter,Tilhengerfeste}', 425, '{#1F4D2B}'),
  ('v-7',  'c-budget','JK 24580', 'Renault',    'Clio',          2022, 'compact', 'petrol',  'manual',    5, 330, '{AC,Bluetooth,Vinterdekk}', null, '{#A8D5A8}'),
  ('v-8',  'c-rentit','VK 19884', 'Mercedes',   'Vito',          2023, 'van',     'diesel',  'automatic', 8, 1200, '{AC,GPS,Bluetooth,Vinterdekk,Tilhengerfeste}', null, '{#5C6157}'),
  ('v-9',  'c-arctic','TR 30021', 'Subaru',     'Outback',       2023, 'wagon',   'petrol',  'automatic', 5, 522, '{AC,GPS,Bluetooth,Vinterdekk,AWD,Skiboks}', null, '{#3A7D44}'),
  ('v-10', 'c-hertz', 'EK 41099', 'Hyundai',    'Kona Electric', 2024, 'compact', 'electric','automatic', 5, 332, '{AC,GPS,Bluetooth,Vinterdekk}', 484, '{#A8D5A8}')
on conflict (id) do nothing;

-- ----------------------------------------------------------------------------
-- listings (dates relative to today so the demo always shows "upcoming")
-- ----------------------------------------------------------------------------
insert into public.listings (id, vehicle_id, company_id, from_city, from_address, to_city, to_address, distance_km, max_km, pickup_start, pickup_end, dropoff_deadline, rules, compensation, status, published_at) values
  ('l-001','v-1', 'c-hertz', 'Oslo',     'Gardermoen Lufthavn, 2061 Gardermoen', 'Bergen',     'Flesland Lufthavn, 5258 Bergen',  480, 530, now() + interval '2 days',  now() + interval '3 days 10 hours', now() + interval '4 days 12 hours',
    '{"fuel":"companyPays","ferry":"covered","tolls":"covered","insurance":"standard","minAge":23,"licenseClass":"B","notes":"Bilen skal lades til 80 % før levering."}',
    '{"kind":"fuelCard"}', 'published', now() - interval '1 day'),
  ('l-002','v-2', 'c-hertz', 'Trondheim','Værnes Lufthavn, 7500 Stjørdal',       'Oslo',       'Hertz Skøyen, 0278 Oslo',         540, 595, now() + interval '4 days',  now() + interval '5 days 10 hours', now() + interval '6 days 12 hours',
    '{"fuel":"returnAsReceived","ferry":"notCovered","tolls":"covered","insurance":"standard","minAge":21,"licenseClass":"B"}',
    '{"kind":"free"}', 'published', now() - interval '1 day'),
  ('l-003','v-3', 'c-avis',  'Oslo',     'Avis Sentrum, 0150 Oslo',              'Tromsø',     'Avis Tromsø Lufthavn, 9012 Tromsø',1620, 1780, now() + interval '1 day',   now() + interval '2 days 10 hours', now() + interval '5 days 12 hours',
    '{"fuel":"companyPays","ferry":"covered","tolls":"covered","insurance":"premium","minAge":25,"licenseClass":"B","notes":"Tesla Supercharger-lading dekkes med medfølgende kort."}',
    '{"kind":"tollsAndFerries"}', 'published', now()),
  ('l-004','v-4', 'c-avis',  'Bergen',   'Avis Flesland, 5258 Bergen',           'Stavanger',  'Avis Sola Lufthavn, 4055 Sola',    210, 235, now() + interval '3 days',  now() + interval '4 days 10 hours', now() + interval '5 days 12 hours',
    '{"fuel":"returnFull","ferry":"covered","tolls":"covered","insurance":"standard","minAge":21,"licenseClass":"B"}',
    '{"kind":"free"}', 'published', now() - interval '2 days'),
  ('l-005','v-5', 'c-sixt',  'Oslo',     'Sixt Sentrum, 0151 Oslo',              'Trondheim',  'Sixt Værnes, 7500 Stjørdal',       495, 545, now() + interval '2 days',  now() + interval '3 days 10 hours', now() + interval '4 days 12 hours',
    '{"fuel":"companyPays","ferry":"covered","tolls":"covered","insurance":"premium","minAge":25,"licenseClass":"B"}',
    '{"kind":"fuelCard"}', 'published', now() - interval '1 day'),
  ('l-006','v-6', 'c-sixt',  'Tromsø',   'Sixt Tromsø, 9012 Tromsø',             'Bodø',       'Sixt Bodø, 8001 Bodø',             720, 790, now() + interval '5 days',  now() + interval '6 days 9 hours',  now() + interval '7 days 12 hours',
    '{"fuel":"companyPays","ferry":"covered","tolls":"covered","insurance":"premium","minAge":25,"licenseClass":"B"}',
    '{"kind":"fuelCard"}', 'published', now()),
  ('l-007','v-7', 'c-budget','Oslo',     'Budget Helsfyr, 0667 Oslo',            'Kristiansand','Budget Kristiansand, 4612 Kristiansand', 320, 350, now() + interval '1 day',   now() + interval '2 days 10 hours', now() + interval '3 days 12 hours',
    '{"fuel":"returnAsReceived","ferry":"notCovered","tolls":"covered","insurance":"standard","minAge":21,"licenseClass":"B"}',
    '{"kind":"free"}', 'published', now() - interval '1 day'),
  ('l-008','v-8', 'c-rentit','Bergen',   'Rent-it Bergen Sentrum, 5008 Bergen',  'Ålesund',    'Rent-it Ålesund, 6004 Ålesund',    380, 420, now() + interval '3 days',  now() + interval '4 days 9 hours',  now() + interval '5 days 12 hours',
    '{"fuel":"companyPays","ferry":"covered","tolls":"covered","insurance":"standard","minAge":23,"licenseClass":"B","notes":"Van - passer fint for flytting eller stor familieferie."}',
    '{"kind":"flatNok","amount":800}', 'published', now()),
  ('l-009','v-9', 'c-arctic','Bodø',     'Arctic Bodø, 8001 Bodø',               'Tromsø',     'Arctic Tromsø, 9012 Tromsø',       560, 615, now() + interval '2 days',  now() + interval '3 days 10 hours', now() + interval '4 days 12 hours',
    '{"fuel":"returnFull","ferry":"covered","tolls":"covered","insurance":"standard","minAge":23,"licenseClass":"B"}',
    '{"kind":"free"}', 'published', now() - interval '1 day'),
  ('l-010','v-10','c-hertz', 'Stavanger','Hertz Sola, 4055 Sola',                'Oslo',       'Hertz Skøyen, 0278 Oslo',          510, 560, now() + interval '2 days',  now() + interval '3 days 10 hours', now() + interval '4 days 12 hours',
    '{"fuel":"companyPays","ferry":"covered","tolls":"covered","insurance":"standard","minAge":23,"licenseClass":"B"}',
    '{"kind":"fuelCard"}', 'published', now() - interval '2 days')
on conflict (id) do nothing;

-- ============================================================================
-- USER + ROLE MAPPING (manual, run after signups)
-- ----------------------------------------------------------------------------
-- After someone signs up via Supabase Auth, run something like this to
-- promote them and link to a company:
--
--   update public.profiles
--      set role = 'admin', name = 'Sara Berg'
--    where email = 'admin@yourcompany.no';
--
--   update public.profiles
--      set role = 'company', name = 'Per Haugen'
--    where email = 'per@hertz.no';
--
--   insert into public.company_members (company_id, profile_id)
--     select 'c-hertz', id from public.profiles where email = 'per@hertz.no';
--
-- ============================================================================
