import { About } from './components/About';
import { ContactCTA } from './components/ContactCTA';
import { Coverage } from './components/Coverage';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { Includes } from './components/Includes';
import { Policies } from './components/Policies';
import { Pricing } from './components/Pricing';
import { QuoteForm } from './components/QuoteForm';
import { Services } from './components/Services';
import { Testimonials } from './components/Testimonials';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { useAnchorNavigation } from './hooks/useAnchorNavigation';

export default function App() {
  useAnchorNavigation();
  return (
    <>
      <Header />
      <main id="contenido" tabIndex={-1} className="overflow-x-clip pt-20">
        <Hero />
        <About />
        <Services />
        <Includes />
        <Pricing />
        <Coverage />
        <HowItWorks />
        <QuoteForm />
        <Policies />
        <FAQ />
        <Testimonials />
        <ContactCTA />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
