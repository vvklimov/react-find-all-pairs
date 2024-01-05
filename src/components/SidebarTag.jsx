import SidebarSubtag from "./SidebarSubtag";

const SidebarTag = ({ tag, subtags }) => {
  return (
    <li>
      <h4 className="tag-btn tag-btn-gradient gradient-hover-effect">{tag}</h4>
      <ul>
        {subtags.map((subtag) => {
          return (
            <SidebarSubtag key={subtag.subtagName} {...subtag} tag={tag} />
          );
        })}
      </ul>
    </li>
  );
};
export default SidebarTag;
