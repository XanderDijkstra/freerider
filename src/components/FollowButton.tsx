import { Button, LinkButton } from "./Button";
import {
  followCompanyAction,
  unfollowCompanyAction,
} from "@/lib/auth-actions";
import { getSession } from "@/lib/session";
import { isFollowing } from "@/data/store";

export async function FollowButton({
  companyId,
  companyName,
}: {
  companyId: string;
  companyName: string;
}) {
  const session = await getSession();

  if (!session) {
    return (
      <LinkButton
        href={`/demo-login?next=/utleier/${companyId}`}
        variant="secondary"
      >
        Følg {companyName}
      </LinkButton>
    );
  }

  if (session.role !== "driver") {
    return null;
  }

  const following = isFollowing(session.userId, companyId);

  return (
    <form action={following ? unfollowCompanyAction : followCompanyAction}>
      <input type="hidden" name="companyId" value={companyId} />
      <Button
        type="submit"
        variant={following ? "primary" : "secondary"}
      >
        {following ? `Følger ${companyName}` : `Følg ${companyName}`}
      </Button>
    </form>
  );
}
