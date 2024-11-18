// "use server";

// import { NextResponse } from "next/server";
// import { getLowestPrice, getHighestPrice, getAveragePrice, getEmailNotifType } from "@/lib/utils";
// import { connectToDB } from "@/lib/mongoose";
// import Product from "@/lib/models/product.model";
// import { scrapeAmazonProduct } from "@/lib/scraper";
// import { generateEmailBody, sendEmail } from "@/lib/nodemailer";

// export const maxDuration = 300; // This function can run for a maximum of 300 seconds
// export const dynamic = "force-dynamic";
// export const revalidate = 0;

// export async function GET(request: Request) {
//   try {
//     // Ensure the DB connection is established first
//     await connectToDB();

//     // Fetch all products from the database
//     const products = await Product.find({});
    
//     // If no products found, throw an error
//     if (!products || products.length === 0) {
//       throw new Error("No products found in the database");
//     }

//     // ======================== 1 SCRAPE LATEST PRODUCT DETAILS & UPDATE DB
//     const updatedProducts = await Promise.all(
//       products.map(async (currentProduct) => {
//         try {
//           // Scrape product from Amazon
//           const scrapedProduct = await scrapeAmazonProduct(currentProduct.url);
          
//           // If scraping fails, log and skip this product
//           if (!scrapedProduct) {
//             console.error(`Failed to scrape product: ${currentProduct.url}`);
//             return null;
//           }

//           // Update price history with the scraped price
//           const updatedPriceHistory = [
//             ...currentProduct.priceHistory,
//             {
//               price: scrapedProduct.currentPrice,
//             },
//           ];

//           // Prepare the updated product data
//           const product = {
//             ...scrapedProduct,
//             priceHistory: updatedPriceHistory,
//             lowestPrice: getLowestPrice(updatedPriceHistory),
//             highestPrice: getHighestPrice(updatedPriceHistory),
//             averagePrice: getAveragePrice(updatedPriceHistory),
//           };

//           // Update the product in the database
//           const updatedProduct = await Product.findOneAndUpdate(
//             { url: product.url },
//             product,
//             { new: true }
//           );

//           if (!updatedProduct) {
//             console.error(`Failed to update product: ${currentProduct.url}`);
//             return null;
//           }

//           // ======================== 2 CHECK EACH PRODUCT'S STATUS & SEND EMAIL ACCORDINGLY
//           const emailNotifType = getEmailNotifType(scrapedProduct, currentProduct);

//           if (emailNotifType && updatedProduct.users.length > 0) {
//             const productInfo = {
//               title: updatedProduct.title,
//               url: updatedProduct.url,
//             };
            
//             // Generate email body content based on the notification type
//             const emailContent = await generateEmailBody(productInfo, emailNotifType);
            
//             // Get the array of user emails to send notifications to
//             const userEmails = updatedProduct.users.map((user: any) => user.email);
            
//             // Send email notifications
//             await sendEmail(emailContent, userEmails);
//           }

//           return updatedProduct;
//         } catch (error) {
//           console.error(`Error processing product: ${currentProduct.url}`, error);
//           return null; // Gracefully handle errors in the individual product processing
//         }
//       })
//     );

//     // Filter out any null values (failed products)
//     const validUpdatedProducts = updatedProducts.filter((product) => product !== null);

//     return NextResponse.json({
//       message: "Products updated successfully",
//       data: validUpdatedProducts,
//     });
//   } catch (error: any) {
//     // Catch any other errors that occur in the process
//     console.error("Error updating products:", error);
//     return NextResponse.json({ message: `Failed to update products: ${error.message}` }, { status: 500 });
//   }
// }
