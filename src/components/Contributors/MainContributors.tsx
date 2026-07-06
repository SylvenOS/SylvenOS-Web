import TopContributors from "./features/TopContributors";

export default function MainContributors({ githubPayload }) {
  return (
    <div>
      {/* Passes down the live dataset; limit prop determines how many nodes to isolate */}
      <TopContributors contributors={githubPayload} limit={3} />
    </div>
  );
}