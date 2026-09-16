import React from "react";
import {
  Globe,
  Code2,
  ShoppingBag,
  RefreshCw,
  Cpu,
  Layers,
  Smartphone,
  Target,
  Sparkles,
  Workflow,
  Bot,
  LucideProps,
} from "lucide-react";

interface ServiceIconProps extends LucideProps {
  name: string;
}

export function ServiceIcon({ name, ...props }: ServiceIconProps) {
  switch (name) {
    case "Globe":
      return <Globe {...props} />;
    case "Code2":
      return <Code2 {...props} />;
    case "ShoppingBag":
      return <ShoppingBag {...props} />;
    case "RefreshCw":
      return <RefreshCw {...props} />;
    case "Cpu":
      return <Cpu {...props} />;
    case "Layers":
      return <Layers {...props} />;
    case "Smartphone":
      return <Smartphone {...props} />;
    case "Target":
      return <Target {...props} />;
    case "Sparkles":
      return <Sparkles {...props} />;
    case "Workflow":
      return <Workflow {...props} />;
    case "Bot":
      return <Bot {...props} />;
    default:
      return <Sparkles {...props} />;
  }
}
