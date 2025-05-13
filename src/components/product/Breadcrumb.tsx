
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface BreadcrumbProps {
  productName: string;
}

const Breadcrumb = ({ productName }: BreadcrumbProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="text-sm text-muted-foreground mb-6 p-2 rounded-md glass backdrop-blur-sm inline-block">
      <Button variant="link" className="p-0 text-muted-foreground" onClick={() => navigate("/")}>Home</Button>
      <span className="mx-2">/</span>
      <Button variant="link" className="p-0 text-muted-foreground" onClick={() => navigate("/shop")}>Shop</Button>
      <span className="mx-2">/</span>
      <span className="text-foreground">{productName}</span>
    </div>
  );
};

export default Breadcrumb;
