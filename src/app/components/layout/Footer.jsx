import Link from "next/link";

const Footer = () => {
  return (
    <footer className="full-bleed bg-kurator-primary text-white px-6 md:px-16 py-16 text-sm-fluid">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">Find os på</h3>
            <ul className="space-y-1 underline underline-offset-2">
              <li><Link href="#">Instagram</Link></li>
              <li><Link href="#">Facebook</Link></li>
              <li><Link href="#">YouTube</Link></li>
              <li><Link href="#">LinkedIn</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">SMK Nyhedsbrev</h3>
            <Link href="#" className="underline underline-offset-2">Tilmeld dig her</Link>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Åbningstider</h3>
            <p><strong>Tirsdag – søndag</strong> 10–18</p>
            <p><strong>Onsdag</strong> 10–20</p>
            <p><strong>Mandag</strong> Lukket</p>
            <Link href="#" className="underline underline-offset-2 block mt-2">
              Se info om særåbent i ferier
            </Link>
          </div>
        </div>

        <div className="space-y-1">
          <h3 className="font-semibold mb-2">Genveje</h3>
          <ul className="space-y-1">
            <li><Link href="#" className="hover:underline">Besøg SMK</Link></li>
            <li><Link href="#" className="hover:underline">Kontakt os</Link></li>
            <li><Link href="#" className="hover:underline">Årskort</Link></li>
            <li><Link href="#" className="hover:underline">Søg i samlingen</Link></li>
            <li><Link href="#" className="hover:underline">Støt SMK</Link></li>
            <li><Link href="#" className="hover:underline">Presse</Link></li>
            <li><Link href="#" className="hover:underline">SMK Thy</Link></li>
          </ul>
        </div>

 
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">Statens Museum for Kunst</h3>
            <p>Sølvgade 48-50</p>
            <p>1307 København K</p>
          </div>

          <div>
            <p><strong>Tlf</strong> 3374 8494</p>
            <p>Telefontid: Tirsdag-fredag kl. 10.00-12.00</p>
            <p><strong>Email</strong> <Link href="mailto:smk@smk.dk" className="underline">smk@smk.dk</Link></p>
          </div>

          <div>
            <h4 className="font-semibold">Booking af undervisning</h4>
            <p>
              <Link href="#" className="underline">Book et forløb eller besøg på egen hånd online</Link> eller kontakt <Link href="#" className="underline">Bookingen</Link>
            </p>
          </div>

          <ul className="space-y-1 underline mt-4">
            <li><Link href="#">Fakturering</Link></li>
            <li><Link href="#">Fotosalg</Link></li>
            <li><Link href="#">Leje af SMK</Link></li>
            <li><Link href="#">Lån og deponering</Link></li>
          </ul>
        </div>
      </div>


    </footer>
  );
};

export default Footer;
