import { allDesigns } from '@/data/index';
import { categories } from '@/data/taxonomy';
import { blogs } from '@/data/blogs';
import { NextResponse } from 'next/server';

// A simple local keyword-based chatbot that requires NO API KEY.
export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const userMessage = messages[messages.length - 1].content.toLowerCase();

    let responseText = "";

    // 1. Greetings
    if (/^(hi|hello|hey|help|start)/.test(userMessage)) {
      responseText = "Hello! I'm the Mehndi Design Assistant. I can help you find specific designs (like 'bridal' or 'arabic'), or you can ask about henna tips and history! What are you looking for today?";
    } 
    else {
      // 2. Search Categories
      const matchedCategory = categories.find(c => 
        userMessage.includes(c.title.toLowerCase()) || 
        c.keywords.some(k => userMessage.includes(k.toLowerCase()))
      );

      if (matchedCategory) {
        // Find some designs in this category
        const categoryDesigns = allDesigns.filter(d => d.categories.includes(matchedCategory.slug)).slice(0, 3);
        
        responseText = `It looks like you're interested in **${matchedCategory.title}** designs!\n\n${matchedCategory.metaDescription}\n\nYou can explore the full category here: [${matchedCategory.title}](/mehndi-designs/${matchedCategory.slug})\n\nHere are a few popular designs you might like:\n`;
        categoryDesigns.forEach(d => {
          responseText += `- [${d.title}](/designs/${d.slug})\n`;
        });
      } 
      else {
        // 3. Search Blogs
        const matchedBlog = blogs.find(b => 
          userMessage.includes(b.title.toLowerCase()) || 
          b.tags.some(t => userMessage.includes(t.toLowerCase())) ||
          (userMessage.includes('how to') && b.slug.includes('guide'))
        );

        if (matchedBlog) {
          responseText = `I have a great article that might help you!\n\n**[${matchedBlog.title}](/blog/${matchedBlog.slug})**\n*${matchedBlog.excerpt}*\n\nRead more to get all the details!`;
        }
        else {
          // 4. Search Designs directly
          const searchWords = userMessage.split(/\s+/).filter((w: string) => w.length > 3);
          
          let matchedDesigns = allDesigns.filter(d => 
            searchWords.some((w: string) => d.title.toLowerCase().includes(w) || d.categories.some(c => c.toLowerCase().includes(w)))
          );

          if (matchedDesigns.length > 0) {
            // Take top 3
            matchedDesigns = matchedDesigns.slice(0, 3);
            responseText = `I found some beautiful designs that match what you're looking for:\n\n`;
            matchedDesigns.forEach(d => {
              responseText += `- [${d.title}](/designs/${d.slug})\n`;
            });
            responseText += `\nIf these aren't quite right, try searching our [Gallery](/gallery)!`;
          } else {
            // 5. Fallback
            responseText = "I'm not exactly sure what you're looking for, but we have over 5000+ designs! Try browsing our [Gallery](/gallery) or checking out our [Categories](/mehndi-designs) for inspiration. You can also ask me for 'bridal designs' or 'arabic henna'.";
          }
        }
      }
    }

    // Simulate streaming for the frontend
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        
        // Chunk the response to simulate typing
        const chunks = responseText.split(' ');
        for (let i = 0; i < chunks.length; i++) {
          controller.enqueue(encoder.encode(chunks[i] + ' '));
          // Delay between 20ms and 50ms per word
          await new Promise(resolve => setTimeout(resolve, Math.random() * 30 + 20));
        }
        controller.close();
      },
    });

    return new NextResponse(stream, {
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'no-cache',
      },
    });

  } catch (error) {
    console.error('Chat error:', error);
    return new NextResponse("Sorry, I encountered an error.", { status: 500 });
  }
}
