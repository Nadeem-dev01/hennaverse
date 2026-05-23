import { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Disclaimer | HennaVerse",
  description: "Terms of use and disclaimer for HennaVerse.",
  alternates: {
    canonical: "/disclaimer",
  },
};

export default function DisclaimerPage() {
  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto min-h-screen">
      <SectionHeading title="Disclaimer & Terms of Use" subtitle="Last Updated: May 22, 2026" />
      
      <div className="prose prose-invert prose-gold max-w-none mt-12">
        <h2>1. General Information</h2>
        <p>The information provided on HennaVerse (the "Website") is for general informational and educational purposes only. All information on the Site is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the Site.</p>
        
        <h2>2. External Links Disclaimer</h2>
        <p>The Site may contain (or you may be sent through the Site) links to other websites or content belonging to or originating from third parties or links to websites and features in banners or other advertising. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability or completeness by us.</p>
        <p>WE DO NOT WARRANT, ENDORSE, GUARANTEE, OR ASSUME RESPONSIBILITY FOR THE ACCURACY OR RELIABILITY OF ANY INFORMATION OFFERED BY THIRD-PARTY WEBSITES LINKED THROUGH THE SITE OR ANY WEBSITE OR FEATURE LINKED IN ANY BANNER OR OTHER ADVERTISING.</p>

        <h2>3. Medical Disclaimer</h2>
        <p>The Site cannot and does not contain medical advice. The henna and mehndi information is provided for general informational and educational purposes only and is not a substitute for professional advice.</p>
        <p><strong>Important Note on Black Henna:</strong> We strongly advise against the use of "Black Henna" which contains PPD (paraphenylenediamine). PPD can cause severe allergic reactions, chemical burns, and permanent scarring. Always ensure your henna artist uses 100% natural henna paste.</p>
        <p>Accordingly, before taking any actions based upon such information, we encourage you to consult with the appropriate professionals. We do not provide any kind of medical advice. THE USE OR RELIANCE OF ANY INFORMATION CONTAINED ON THIS SITE IS SOLELY AT YOUR OWN RISK.</p>

        <h2>4. Copyright & Image Usage</h2>
        <p>The images displayed on HennaVerse are intended for inspiration and educational purposes. Where possible, credit is given to the original photographer or artist. If you are the copyright owner of an image displayed on this site and would like it removed or properly credited, please contact us via our Contact page, and we will address your request promptly.</p>

        <h2>5. Affiliate & Advertising Disclaimer</h2>
        <p>This Site uses Google AdSense and may contain affiliate links. If you click on an affiliate link and make a purchase, we may receive a small commission at no extra cost to you. These commissions help support the maintenance of HennaVerse.</p>
      </div>
    </div>
  );
}
