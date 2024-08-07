import { useShowGameMenu } from "@/components";

const ApplyChangesBtn = () => {
  const { showGameMenu } = useShowGameMenu();
  return (
    <button className="apply-changes-btn btn" onClick={showGameMenu}>
      apply changes
    </button>
  );
};
export default ApplyChangesBtn;
