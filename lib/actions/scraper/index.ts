import { extractCurrency, extractDescription, extractPrice } from '@/lib/utils';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { isValidElement } from 'react';
export async function scrapeAmazonProduct(url:string){
    if(!url) return;

    //bright data 
    const username = String(process.env.BRIGHT_DATA_USERNAME);
    const password = String(process.env.BRIGHT_DATA_PASSWORD);
    const port = 2225;
    const session_id = (1000000 * Math.random()) | 0;
    const options = {
        auth: {
          username: `${username}-session-${session_id}`,
          password,
        },
        host: 'brd.superproxy.io',
        port,
        rejectUnauthorized: false,
      }
      try{
        const response = await axios.get(url,options);
        const $ = cheerio.load(response.data);
        //extrating title
        const title = $('#productTitle').text().trim();
        const currentPrice = extractPrice(
          $('.priceToPay span.a-price-whole'),
          $('a.size.base.a-color-price'),
          $('.a-button-selected.a-color-base')
        );
        const originalPrice = extractPrice(
          $('#priceblock_ourprice'),
          $('.a-price.a-text-price span.a-offscreen'),
          $('#listPrice'),
          $('#priceblock_dealprice'),
          $('.a-size-base.a-color-price')
        );
        const availabilityText = $('#availability span').text().trim().toLowerCase();
        const isAvailable = availabilityText !== 'currently unavailable';

        const description = extractDescription($)

    const images = 
      $('#imgBlkFront').attr('data-a-dynamic-image') || 
      $('#landingImage').attr('data-a-dynamic-image') ||
      $('li.imageThumbnail img').attr('data-a-dynamic-image') ||
      $('li.imageThumbnail img').attr('src')
      $('div#mainImageContainer img').attr('data-a-dynamic-image') ||
      $('div#mainImageContainer img').attr('src')
      '{}'
      const imageUrls = Object.keys(JSON.parse(images));
      const currency = extractCurrency ($('.a-price-symbol'))
      const discountRate = $('.savingsPercentage').text().replace(/[-%]/g,"");
      //contruction of data objects
      const data = {
        url,
        currency: currency || '$',
        image: imageUrls[0],
        title,
        currentPrice: Number(currentPrice) || Number(originalPrice),
        originalPrice: Number(originalPrice) || Number(currentPrice),
        priceHistory: [],
        discountRate: Number(discountRate),
        category: 'category',
        reviewsCount:100,
        stars: 4.5,
        isAvailable: isAvailable,
        description: description,
        lowestPrice: Number(currentPrice) || Number(originalPrice),
        highestPrice: Number(originalPrice) || Number(currentPrice),
        averagePrice: Number(currentPrice) || Number(originalPrice),
      }
      return data;
      }catch (error: any){
        throw new Error('Failed to scrape product:${error.message}')
      }
}