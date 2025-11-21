export default function AyurvediaPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* HERO SECTION */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 max-w-7xl mx-auto mb-16">
        {/* Left: Large Kapha Image */}
        <div className="relative h-96 lg:h-full rounded-lg overflow-hidden ">
          <img
            src="/assets/ayurveda.png"
            alt="Kapha meditation"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right: Intro Text + Logo */}
        <div className="flex flex-col justify-center space-y-8">
          <div>
            <h2 className="text-5xl font-bold text-[#D7B11E] mb-6">AYURVEDA</h2>
            <p className="text-xl text-gray-800 font-semibold mb-4">
              Der Weg zu innerer und äußerer Schönheit
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Die traditionelle indische Heilkunst versteht die Menschen als
              Einheit von Körper, Geist und Seele und bezieht dabei alle Aspekte
              des Lebens ein.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Wir unterscheiden zwischen drei Grundtypen (Doshas), dem Vata-,
              dem Pitta- und dem Kapha-Typ.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Natürlich gibt es auch Mischtypen aus unterschiedlichen Doshas.
            </p>
          </div>

          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div>
              <img
                src="/assets/logo.png"
                alt="Vata"
                className="w-85 h-30 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* THREE DOSHA CARDS SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 max-w-7xl mx-auto mb-16">
        {/* VATA CARD */}
        <div className="rounded-lg overflow-hidden shadow-lg bg-white">
          <div className="relative h-80 overflow-hidden">
            <img
              src="/assets/vata.png"
              alt="Vata"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 via-transparent to-transparent flex flex-col justify-end p-6">
              <h2 className="text-4xl font-bold text-white mb-1">VATA</h2>
              <p className="text-xl text-white">Schnell & wendig</p>
            </div>
          </div>
          <div className="p-6">
            <p className="text-gray-600 text-xs mb-4 font-semibold uppercase tracking-wider">
              Schnell & wendig
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              Gehören Sie als Vata-Typ auch zu den Menschen, die gerne in
              Bewegung sind? Kein Wunder, denn Vata steht für Bewegung – auf
              körperlicher und geistiger Ebene. Von ihren Mitmenschen werden
              Vata-Typen daher häufig für ihre Ideen, ihre Redegewandtheit,
              Kreativität und Leichtigkeit bewundert. Menschen mit einer
              Vata-Konstitution reden gern, schnell und viel und zeigen dabei –
              sofern Vata in Balance ist – ein ausgesprochen gutes Gespür für
              die richtigen Worte.
            </p>

            <br />
            <p className="text-gray-600 text-xs mb-4 font-semibold uppercase tracking-wider">
              Körperbau – zart & feingliedrig
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              Entsprechend ihrer Zuordnung zu den Elementen Luft und Raum sind
              Vata-Typen in der Regel zart gebaut und entsprechend leicht. Dabei
              können sie sehr groß und schlank, aber auch klein und zierlich
              sein. Sie haben häufig feine Gesichtszüge, kleine lebendige Augen
              und eher schmale Lippen. Die Blutgefäße und Sehnen können sich
              insbesondere an den Händen deutlich abzeichnen.
            </p>

            <br />
            <p className="text-gray-600 text-xs mb-4 font-semibold uppercase tracking-wider">
              Haut & Haare – fein & trocken
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              Vata-Typen neigen zu trockener Haut, die sich entsprechend über
              eine reichhaltige Pflege freut. Die Haare sind eher dünn und
              ebenfalls trocken.
            </p>

            <br />
            <p className="text-gray-600 text-xs mb-4 font-semibold uppercase tracking-wider">
              Stoffwechsel & Verdauung
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              Vata-Typen haben in der Regel ein variables Agni (Verdauungsfeuer,
              siehe Hinweis). Entsprechend schwankt ihr Appetit. Andere beneiden
              sie häufig darum, dass sie auch dann kaum zunehmen, wenn sie mehr
              essen. Bei Menschen mit ausgeprägtem Vata-Dosha kann es zu
              Blähungen kommen, wenn sie zu viel Wasser trinken oder im Stress
              sind.
            </p>

            <br />
            <p className="text-gray-600 text-xs mb-4 font-semibold uppercase tracking-wider">
              Liebhaber von Wärme und sanften Tönen
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              Vata-Typen haben einen ausgeprägten Gehör- und Tastsinn.
              Entsprechend sensibel reagieren sie auf laute Geräusche und Lärm
              in ihrer Umgebung. Da sie leicht frieren, gehören Vata-Menschen zu
              den Wärmeliebhabern. Das gilt für warme Sommertage ebenso wie für
              warme Speisen und Heißgetränke.
            </p>

            <br />
            <p className="text-gray-600 text-xs mb-4 font-semibold uppercase tracking-wider">
              Lebendiger Geist – mit Begeisterung aktiv
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              Vata-Typen sind meist mit einem wachen Geist, einer schnellen
              Auffassungsgabe und großer Begeisterungsfähigkeit gesegnet. Sie
              lernen sehr schnell, haben ein ausgezeichnetes Kurzzeitgedächtnis,
              während länger Vergangenes gerne rasch verblasst. Zugleich
              beschert ihnen Vata ein hohes Maß an Flexibilität, Lebendigkeit,
              Sensibilität und jede Menge Fantasie.
            </p>

            <br />
            <p className="text-gray-600 text-xs mb-4 font-semibold uppercase tracking-wider">
              Berufe, in denen Vata-Typen ihre Talente verwirklichen können
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              Mit ihrem Einfallsreichtum, ihrer Kreativität und Geschicklichkeit
              sind Vata-Typen prädestiniert für künstlerische, wissenschaftliche
              oder kreative Berufe. Besonders erfolgreich sind sie auch in
              Berufen, in denen ihre Eloquenz gefragt ist, z.B. als Journalist
              oder Dolmetscher.
            </p>

            <br />
            <p className="text-gray-600 text-xs mb-4 font-semibold uppercase tracking-wider">
              Mögliche Schattenseiten bei Vata-Überschuss
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              Ein Vata-Überschuss kann zu Ängstlichkeit, Nervosität und Unruhe
              führen, die den Vata-Typ abends schlecht einschlafen lässt oder
              tagsüber die Konzentration stört. Vata-Typen sind nicht sehr
              belastbar und kommen weniger gut mit Stress zurecht. Als
              Bewegungselement steht Vata in Verbindung mit unserem
              Nervensystem, unserer Atmung, dem Kreislauf, unseren Muskeln und
              Gelenken sowie der Ausscheidung. Auf körperlicher Ebene kann sich
              ein Vata-Überschuss daher z.B. als Kopf- oder Rückenschmerzen,
              Unruhe oder Verstopfung äußern. Auch kalte Hände und Füße weisen
              auf eine Vata-Störung hin.
            </p>
          </div>
        </div>

        {/* PITTA CARD */}
        <div className="rounded-lg overflow-hidden shadow-lg bg-white">
          <div className="relative h-80 overflow-hidden">
            <img
              src="/assets/pitta.png"
              alt="Pitta"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-orange-900/70 via-transparent to-transparent flex flex-col justify-end p-6">
              <h2 className="text-4xl font-bold text-white mb-1">PITTA</h2>
              <p className="text-xl text-white">"Ms. & Mr. Perfect"</p>
            </div>
          </div>
          <div className="p-6">
            <p className="text-gray-600 text-xs mb-4 font-semibold uppercase tracking-wider">
              „Ms. & Mr. Perfect“
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              Mit ihrem athletischen Körperbau und ihrer Ausstrahlung ziehen
              Pitta-Typen bewundernde Blicke auf sich. Das feurige Pitta
              beschert ihnen viel Temperament und eine gute Verdauung.
              Pitta-Typen haben ein großes Potenzial, sind leistungsstark und
              finden sich häufig in Führungspositionen. Dennoch – oder gerade
              deshalb – sollten sie gut auf sich aufpassen ...
            </p>

            <br />
            <p className="text-gray-600 text-xs mb-4 font-semibold uppercase tracking-wider">
              Athletischer Körperbau
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              Pitta-Typen haben meist einen athletischen bis drahtigen Körper
              und sind in der Regel mittelgroß. Sie haben häufig markante
              Gesichtszüge mit einer hohen Stirn und strahlende, glänzende Augen
            </p>

            <br />
            <p className="text-gray-600 text-xs mb-4 font-semibold uppercase tracking-wider">
              Rosiger Teint & rot-blondes Haar
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              Typischerweise haben Pitta-Typen blondes oder rotes Haar, das eher
              fein bis licht sein und früh ergrauen kann. Die Haut ist meist gut
              durchblutet, was Pitta-Typen einen rosigen Teint beschert.
              Ansonsten ist die Haut gern von Sommergesprossen gezeichnet, eher
              hell und entsprechend sensibel. Dank ihres hohen Feuer-Anteils
              schwitzen Pitta-Typen leicht.
            </p>

            <br />
            <p className="text-gray-600 text-xs mb-4 font-semibold uppercase tracking-wider">
              Stoffwechsel & Verdauung – Hier ist Pitta in seinem Element.
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              Pitta ist verantwortlich für Verdauung und Stoffwechsel.
              Entsprechend dürfen sich Pitta-Typen meist über ein starkes Agni
              (siehe Hinweis) freuen. Sie essen gerne viel und vertragen in der
              Regel jede Nahrung. Ihre Mitmenschen versetzen sie mitunter in
              Staunen, wenn sie schon kurz nach einer Mahlzeit wieder Appetit
              verspüren. Umgekehrt reagieren sie schnell gereizt, wenn sich eine
              Mahlzeit verspätet oder gar ausfällt. Für diesen Ayurveda-Typ sind
              feste Essenszeiten besonders wichtig.
            </p>

            <br />
            <p className="text-gray-600 text-xs mb-4 font-semibold uppercase tracking-wider">
              Leuchtende Augen & scharfer Blick Der wichtigste Sinn ist für
              Pitta-Typen das Sehen. Auffällig sind oft ihre leuchtenden Augen
              und ihr scharfer Blick.
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              Präzise, temperamentvoll & freiheitsliebend Pitta-dominante
              Menschen sind einerseits emotional und temperamentvoll,
              andererseits bestens organisiert, ordentlich und gut strukturiert.
              Zugleich sind sie ehrgeizig und entscheidungsfreudig. In
              Gesprächen kommen sie gern schnell auf den Punkt. Ihre präzise
              Sprache und Ausstrahlung machen Pitta-Typen zu besonders guten
              Rednern. Menschen mit einem ausgeprägten Pitta-Dosha sind sehr
              selbstständig, benötigen aber zugleich viel Freiraum.
            </p>

            <br />
            <p className="text-gray-600 text-xs mb-4 font-semibold uppercase tracking-wider">
              Berufe, in denen Pitta-Typen ihre Talente verwirklichen können
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              Pitta verleiht große Ausstrahlung und Selbstständigkeit, die sie
              dank ihres Ehrgeizes auch zu nutzen wissen. Daher sind Pitta-Typen
              häufig als Selbstständige, in der Politik oder in
              Führungspositionen zu finden. Dabei kommen ihnen auch ihr
              Organisationstalent, ihre analytischen Fähigkeiten und ihre
              Entscheidungsfreudigkeit zugute.
            </p>

            <br />
            <p className="text-gray-600 text-xs mb-4 font-semibold uppercase tracking-wider">
              Mögliche Schattenseiten bei Pitta-Überschuss
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              Wenn Pitta zu sehr die Oberhand gewinnt, kann die Ordnungsliebe in
              Perfektionismus und Rechthaberei übergehen. Auch Ungeduld,
              Gereiztheit und Wutausbrüche gehören zu den typischen Zeichen
              eines Pitta-Überschusses. Anders als Vata-dominierte Menschen
              schläft der Pitta-Typ zwar gut ein, wacht aber dafür nachts
              häufiger auf und kann dann unter Umständen nicht mehr einschlafen.
              Auf körperlicher Ebene können Hautausschläge und Entzündungen als
              Ausdruck einer Pitta-Störung auftreten. Mit ihrer Ordnungsliebe
              und hohem Anspruch neigen Pitta-Typen gern dazu, sich selbst zu
              überfordern. Umso wichtiger ist es für sie, ihre Energiereserven
              gut im Blick zu haben und auf eine gute Balance zu achten.
            </p>
          </div>
        </div>

        {/* KAPHA CARD */}
        <div className="rounded-lg overflow-hidden shadow-lg bg-white">
          <div className="relative h-80 overflow-hidden">
            <img
              src="/assets/kapha.png"
              alt="Kapha"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-green-900/70 via-transparent to-transparent flex flex-col justify-end p-6">
              <h2 className="text-4xl font-bold text-white mb-1">KAPHA</h2>
              <p className="text-xl text-white">In der Ruhe liegt die Kraft</p>
            </div>
          </div>
          <div className="p-6">
            <p className="text-gray-600 text-xs mb-4 font-semibold uppercase tracking-wider">
              In der Ruhe liegt die Kraft
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              Als Verbindung der Elemente Erde und Wasser steht Kapha vor allem
              für Struktur und Stabilität. Das spiegelt sich beim Kapha-Typen
              gleichermaßen auf körperlicher und psychischer Ebene wider. So
              werden sie häufig für ihre Robustheit, ihre Ruhe, Gelassenheit und
              Ausdauer geschätzt. Das spiegelt sich auch in ihren eher ruhigen
              Bewegungen und gutem, eher zu langen Schlaf wider.
            </p>

            <br />
            <p className="text-gray-600 text-xs mb-4 font-semibold uppercase tracking-wider">
              Kräftiger Körperbau
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              Kapha-Typen haben meist einen stabilen, schweren Körperbau mit
              kräftigen Gelenken. Ausgeprägtes Muskel- und auch Fettgewebe lässt
              ihren Körper robust bis stämmig wirken. Ihre Gesichts- und
              sonstigen Körperformen sind eher rund. Typisch sind beispielsweise
              volle Lippen und große Augen.
            </p>

            <br />
            <p className="text-gray-600 text-xs mb-4 font-semibold uppercase tracking-wider">
              Kräftige Haare & jugendliches Aussehen
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              Kapha-Typen haben meist volles, kräftiges Haar. Die Haut (und
              Kopfhaut) wird eher fettend sein. Das Kapha-Dosha beschert weniger
              Falten und damit lange ein jugendliches Aussehen.
            </p>

            <br />
            <p className="text-gray-600 text-xs mb-4 font-semibold uppercase tracking-wider">
              Stoffwechsel & Verdauung
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              Kapha-Typen haben ein eher geringes Agni (siehe Hinweis). Zugleich
              essen sie als Genussmenschen gerne häufiger, viel und Süßes. Das
              kann insbesondere bei Stress zu einer unliebsamen Gewichtserhöhung
              führen.
            </p>

            <br />
            <p className="text-gray-600 text-xs mb-4 font-semibold uppercase tracking-wider">
              Genießen über Mund und Nase
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              Für Kapha-Typen spielen das Riechen und Schmecken eine besondere
              Rolle. Entsprechend kochen sie häufig gern und genießen umgekehrt
              auch gute Speisen.
            </p>

            <br />
            <p className="text-gray-600 text-xs mb-4 font-semibold uppercase tracking-wider">
              Ruhig & besonnen – auch in Krisenzeiten
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              Als Fels in der Brandung bewahren Kapha-Typen auch in stürmischen
              Zeiten die Ruhe. Zugleich verfügen sie über die nötigen
              Energiereserven, Geduld und Ausdauer, um auch dann am Ball zu
              bleiben, wenn es einmal schwierig wird. Dabei sind sie deutlich
              belastbarer als andere Konstitutionstypen. An ihre Aufgaben gehen
              sie methodisch und mit Besonnenheit heran. Anders als Pitta-Typen
              lassen Menschen mit einer Kapha-Konstitution die Dinge eher auf
              sich zukommen und geben nicht so schnell auf.
            </p>

            <br />
            <p className="text-gray-600 text-xs mb-4 font-semibold uppercase tracking-wider">
              Berufe, in denen Kapha-Typen ihre Talente verwirklichen können
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              Mit ihrer Geduld, Ausdauer und Beharrlichkeit haben Kapha-Typen
              das nötige Rüstzeug für langfristige Projekte, Routinearbeiten
              aller Art und große Aktenberge. Wenn es einmal schwierig wird,
              hilft ihnen ihre Gelassenheit dabei, unbeirrt durchzuhalten. Wann
              immer es etwas zu organisieren oder zu planen gibt, können sie
              ihre Talente voll zur Geltung bringen. Auch in gestalterischen
              Berufen, z.B. als Architekt, aber auch in Pflegeberufen sind
              Kapha-Typen mit ihrem Sinn für Ästhetik und Mitgefühl oft sehr gut
              aufgehoben.
            </p>

            <br />
            <p className="text-gray-600 text-xs mb-4 font-semibold uppercase tracking-wider">
              Mögliche Schattenseiten bei Kapha-Überschuss
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              Ein ausgeprägter Kapha-Überschuss kann zu einer gewissen
              Langsamkeit, Trägheit und mitunter auch Traurigkeit und
              Antriebslosigkeit führen. Loslassen fällt Kapha-Typen eher schwer.
              Auf körperlicher Ebene zeigt sich das gern als Übergewicht oder
              langsamer Verdauung. Die Haut kann etwas ölig wirken und dann zu
              Allergien und Infekten neigen.
            </p>
          </div>
        </div>
      </div>

      {/* DETAILED DESCRIPTIONS */}
    </div>
  );
}
