
import { TabsContent } from "@/components/ui/tabs";

const ProductDescription = () => {
  return (
    <TabsContent value="description" className="mt-0">
      <div className="space-y-4">
        <p>
          This beautiful handcrafted item is made with care by our skilled artisans. 
          Each piece is unique and may vary slightly from the images shown, adding to its charm and character.
        </p>
        <h3 className="text-lg font-medium mt-4">Features:</h3>
        <ul className="list-disc pl-6 space-y-1">
          <li>Handmade with premium materials</li>
          <li>Unique design</li>
          <li>Sustainable and eco-friendly production</li>
          <li>Carefully packaged to prevent damage during shipping</li>
        </ul>
        <h3 className="text-lg font-medium mt-4">Dimensions:</h3>
        <p>Approximately 8" x 6" x 4" (dimensions may vary slightly due to the handmade nature)</p>
        <h3 className="text-lg font-medium mt-4">Care Instructions:</h3>
        <p>Gently clean with a damp cloth. Avoid direct sunlight and extreme temperatures.</p>
      </div>
    </TabsContent>
  );
};

export default ProductDescription;
