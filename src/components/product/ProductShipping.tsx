
import { TabsContent } from "@/components/ui/tabs";

const ProductShipping = () => {
  return (
    <TabsContent value="shipping" className="mt-0">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-2">Shipping Information</h3>
          <p>We ship all items within 1-3 business days of order confirmation. Please allow additional time for delivery based on your location:</p>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>Domestic: 3-5 business days</li>
            <li>International: 7-14 business days</li>
          </ul>
          <p className="mt-2">All orders include tracking information so you can follow your package's journey to you.</p>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-2">Return Policy</h3>
          <p>We want you to be completely satisfied with your purchase. If you're not happy with your item, we accept returns within 30 days of delivery for a full refund or exchange.</p>
          <p className="mt-2">To initiate a return, please email us at returns@crafity.com with your order number and reason for return.</p>
          <p className="mt-2">Please note: Due to the handmade nature of our products, slight variations in color, texture, and size are normal and not considered defects.</p>
        </div>
      </div>
    </TabsContent>
  );
};

export default ProductShipping;
