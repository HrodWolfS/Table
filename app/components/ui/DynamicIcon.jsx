import * as LucideIcons from "lucide-react";

const DynamicIcon = ({ name, ...props }) => {
  const Icon = LucideIcons[name];
  if (!Icon) return null;
  return <Icon {...props} />;
};

export default DynamicIcon;
