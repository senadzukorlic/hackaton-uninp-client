import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { User, Activity, TrendingUp, Clock, Brain, Zap, Cpu, Flame, Award } from 'lucide-react';
// Pretpostavljam da su ove komponente u relativnom folderu 'components'
import AnimatedSection from '../components/AnimatedSection'; // Putanja može varirati
import Button from '../components/Button'; // Putanja može varirati
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { UserType } from '../types/UserType'; // Pretpostavljam da je tip definisan ovde

// Registruj Chart.js komponente i plugin za labele
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const ProfilePage: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserType>({
    username: '',
    email: '',
    // Dodajte ostala polja iz UserType ako postoje, npr. id: 0
  });
  const token = localStorage.getItem('token') || '';
  let userID: number | null = null;

  // Dekodiranje tokena i provera
  try {
    if (token) {
      const decoded: { id: number } = jwtDecode(token);
      userID = decoded.id;
    } else {
      console.warn('Token nije pronađen u localStorage.');
      // Ovde možete dodati logiku za preusmeravanje na login stranicu
    }
  } catch (error) {
    console.error('Greška pri dekodiranju tokena:', error);
    // Obrada greške, npr. brisanje neispravnog tokena i preusmeravanje
    localStorage.removeItem('token');
    // window.location.href = '/login'; // Primer preusmeravanja
  }


  // Mock podaci za skorašnje aktivnosti (ostavljeno na engleskom za primer)
  const recentActivities = [
    { id: 1, action: 'Completed AI-driven gym routine', timestamp: '2025-04-25 08:00' },
    { id: 2, action: 'Finished productivity task: Project Plan', timestamp: '2025-04-24 14:30' },
    { id: 3, action: 'Started learning module: AI Basics', timestamp: '2025-04-23 10:00' },
  ];

  // Mock podaci za postignuća (prevedeno)
  const achievements = [
    {
      id: 1,
      title: 'Ratnik Teretane',
      description: 'Završeno 30 uzastopnih dana AI vođenih rutina u teretani',
      icon: <Zap size={24} className="text-yellow-500" />,
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&q=80', // Slika tegova
      date: '2025-04-20',
    },
    {
      id: 2,
      title: 'Majstor Zadataka',
      description: 'Završeno 50 AI dodeljenih produktivnih zadataka',
      icon: <Award size={24} className="text-blue-500" />,
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&q=80', // Slika radnog stola
      date: '2025-04-15',
    },
    {
      id: 3,
      title: 'Stručnjak za Učenje',
      description: 'Završeno 10 AI vođenih modula za učenje',
      icon: <Brain size={24} className="text-green-500" />,
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&q=80', // Slika knjiga/učenja
      date: '2025-04-10',
    },
  ];

  // Mock podaci za niz (prevedeno)
  const streak = {
    count: 35, // 35 uzastopnih dana
  };

  // Funkcija za dobijanje informacija o korisniku
  const getUserInfo = async () => {
    if (!userID) {
      console.error('UserID nije dostupan za dohvat informacija.');
      return; // Prekini izvršavanje ako nema userID
    }
    try {
      const response = await axios.get(`http://localhost:8080/api/users/${userID}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Obično se koristi Bearer šema
        },
      });
      setUserInfo(response.data);
    } catch (err) {
      console.error('Greška pri dohvatanju informacija o korisniku:', err);
      // Ovde možete dodati obradu greške, npr. prikaz poruke korisniku
    }
  };

  useEffect(() => {
    if (userID) { // Pokreni dohvat samo ako userID postoji
      getUserInfo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userID]); // Ponovo pokreni ako se userID promeni (iako se obično ne menja)

  // Varijante za animaciju kontejnera
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Deca se pojavljuju jedno za drugim
      },
    },
  };

  // Varijante za animaciju pojedinačnih elemenata
  const itemVariants = {
    hidden: { opacity: 0, y: 20 }, // Počinje nevidljivo i malo ispod
    visible: {
      opacity: 1,
      y: 0, // Završava vidljivo na originalnoj poziciji
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1], // Prilagođena kriva ubrzanja za lepši efekat
      },
    },
  };

  // Podaci za grafikone (prevedeni labele)
  const activityData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun'], // Meseci mogu ostati skraćeni
    datasets: [
      {
        label: 'Pridržavanje Rutine (%)', // Prevedeno
        data: [70, 75, 80, 85, 90, 95], // Mock podaci
        fill: false,
        borderColor: '#10b981', // Emerald boja
        tension: 0.4, // Glatke linije
      },
    ],
  };

  const progressData = {
    labels: ['Nedelja 1', 'Nedelja 2', 'Nedelja 3', 'Nedelja 4'], // Prevedeno
    datasets: [
      {
        label: 'Stopa Završetka Zadataka (%)', // Prevedeno
        data: [60, 70, 85, 90], // Mock podaci
        backgroundColor: '#3b82f6', // Plava boja
        borderColor: '#3b82f6',
        borderWidth: 1,
      },
    ],
  };

  const performanceData = {
    labels: ['Rutine u Teretani', 'Produktivni Zadaci', 'Moduli za Učenje'], // Prevedeno
    datasets: [
      {
        data: [35, 40, 25], // Mock podaci
        backgroundColor: ['#10b981', '#3b82f6', '#f59e0b'], // Emerald, Plava, Žuta
        borderColor: ['#fff'], // Bela ivica za bolji izgled
        borderWidth: 2,
      },
    ],
  };

  const aiModelsData = {
    labels: [ // Prevedeno
      'Optimizacija Rutine',
      'Prioritetizacija Zadataka',
      'Praćenje Fitnesa',
      'Put Učenja',
      'Analiza Motivacije',
    ],
    datasets: [
      {
        label: 'Performanse (%)', // Prevedeno
        data: [92, 88, 95, 90, 85], // Mock podaci za performanse
        backgroundColor: [
          'rgba(59, 130, 246, 0.6)', // Plava
          'rgba(139, 92, 246, 0.6)', // Ljubičasta
          'rgba(16, 185, 129, 0.6)', // Emerald
          'rgba(245, 158, 11, 0.6)', // Žuta
          'rgba(236, 72, 153, 0.6)', // Roze
        ],
        borderColor: [
          'rgba(59, 130, 246, 1)',
          'rgba(139, 92, 246, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(236, 72, 153, 1)',
        ],
        borderWidth: 2,
        reliability: [90, 85, 93, 88, 80], // Mock podaci za pouzdanost
      },
    ],
  };

  // Osnovne opcije za grafikone
  const baseChartOptions = {
    responsive: true, // Prilagođava se veličini kontejnera
    maintainAspectRatio: false, // Dozvoljava promenu odnosa širine i visine
    plugins: {
      legend: { // Legenda grafikona
        labels: {
          color: '#1f2937', // Boja teksta legende (tamno siva)
          usePointStyle: true, // Koristi tačke umesto pravougaonika u legendi
        },
      },
      tooltip: { // Opcije za prikaz informacija na prelaz mišem
        callbacks: {
          label: (context: any) => { // Prilagođavanje teksta u tooltip-u
            const index = context.dataIndex;
            const dataset = context.dataset;
            const model = context.chart.data.labels?.[index] ?? 'Nepoznato'; // Naziv modela
            const performance = dataset.data?.[index] ?? 'N/A'; // Vrednost performansi
            const reliability = dataset.reliability?.[index]; // Vrednost pouzdanosti (ako postoji)
            // Prevedeni format tooltip-a
            return reliability !== undefined
              ? `${model}: Performanse ${performance}%, Pouzdanost ${reliability}%`
              : `${dataset.label}: ${context.raw}`; // Osnovni format ako nema pouzdanosti
          },
        },
      },
      datalabels: { // Opcije za prikaz vrednosti direktno na grafikonu
        color: '#1f2937', // Boja teksta labele (tamno siva)
        anchor: 'end', // Pozicija labele (na kraju elementa)
        align: 'end', // Poravnanje labele (na kraju)
        formatter: (value: number) => value, // Prikazuje samo vrednost
      },
    },
    scales: { // Opcije za X i Y ose
      x: { // X osa
        title: {
          display: true,
          text: 'Performanse (%)', // Naziv X ose (prevedeno)
          color: '#1f2937',
        },
        ticks: { color: '#1f2937' }, // Boja oznaka na osi
        grid: { color: '#e5e7eb' }, // Boja linija mreže (svetlo siva)
      },
      y: { // Y osa
        title: {
          display: true,
          text: 'AI Model', // Naziv Y ose (prevedeno)
          color: '#1f2937',
        },
        ticks: { color: '#1f2937' },
        grid: { color: '#e5e7eb' },
      },
    },
  };

  // Opcije za grafikone u tamnom režimu
  const darkModeChartOptions = {
    ...baseChartOptions, // Nasleđuje osnovne opcije
    plugins: {
      ...baseChartOptions.plugins,
      legend: {
        labels: {
          ...baseChartOptions.plugins.legend.labels,
          color: '#f3f4f6', // Svetlija boja teksta za tamni režim
        },
      },
      datalabels: {
        ...baseChartOptions.plugins.datalabels,
        color: '#f3f4f6', // Svetlija boja labela
      },
    },
    scales: {
      x: {
        ...baseChartOptions.scales.x,
        title: {
          ...baseChartOptions.scales.x.title,
          color: '#f3f4f6', // Svetlija boja naziva ose
        },
        ticks: { color: '#f3f4f6' }, // Svetlija boja oznaka
        grid: { color: '#374151' }, // Tamnija boja mreže
      },
      y: {
        ...baseChartOptions.scales.y,
        title: {
          ...baseChartOptions.scales.y.title,
          color: '#f3f4f6',
        },
        ticks: { color: '#f3f4f6' },
        grid: { color: '#374151' },
      },
    },
  };

  // Specifične opcije za Doughnut grafikon
  const doughnutOptions = (isDarkMode: boolean) => ({
    ...(isDarkMode ? darkModeChartOptions : baseChartOptions), // Prilagođava osnovne opcije na osnovu režima
    plugins: {
      ...(isDarkMode ? darkModeChartOptions.plugins : baseChartOptions.plugins),
      datalabels: { // Override datalabels za Doughnut
        color: '#fff', // Bela boja za bolju vidljivost unutar segmenata
        anchor: 'center',
        align: 'center',
        formatter: (value: number) => `${value}%`, // Formatira vrednost kao procenat
      },
    },
    scales: undefined, // Doughnut nema ose
  });


  // Specifične opcije za horizontalni Bar grafikon (AI Modeli)
  const horizontalBarOptions = (isDarkMode: boolean) => ({
    ...(isDarkMode ? darkModeChartOptions : baseChartOptions),
    indexAxis: 'y' as const, // Postavlja Y osu kao glavnu osu (pravi horizontalni grafikon)
    scales: { // Obrnute ose za horizontalni grafikon
        x: { // Sada predstavlja vrednosti (Performanse)
            min: 0, // Počinje od 0
            // max: 100, // Može se postaviti max ako je uvek procenat
            title: {
                display: true,
                text: 'Performanse (%)',
                color: isDarkMode ? '#f3f4f6' : '#1f2937',
            },
            ticks: { color: isDarkMode ? '#f3f4f6' : '#1f2937' },
            grid: { color: isDarkMode ? '#374151' : '#e5e7eb' },
        },
        y: { // Sada predstavlja kategorije (AI Modeli)
            title: {
                display: false, // Naziv ose obično nije potreban ovde
                text: 'AI Model',
                color: isDarkMode ? '#f3f4f6' : '#1f2937',
            },
            ticks: { color: isDarkMode ? '#f3f4f6' : '#1f2937' },
            grid: { display: false }, // Često se isključuje vertikalna mreža
        },
    },
    plugins: {
      ...(isDarkMode ? darkModeChartOptions.plugins : baseChartOptions.plugins),
      datalabels: { // Prilagođene labele za horizontalni grafikon
        color: isDarkMode ? '#f3f4f6' : '#1f2937',
        anchor: 'end', // Na kraju trake
        align: 'right', // Poravnato desno unutar trake
        padding: { right: 6 }, // Mali razmak od kraja trake
        formatter: (value: number, context: any) => { // Prikazuje performanse i pouzdanost
           // Provera da li reliability postoji pre pristupa
           const reliability = context.dataset.reliability?.[context.dataIndex];
           return reliability !== undefined ? `${value}% (Pouz: ${reliability}%)` : `${value}%`; // Prevedeno "Rel" -> "Pouz"
        },
      },
    },
  });

  // Provera da li je tamni režim aktivan (na osnovu klase na <html> elementu)
  const [isDarkMode, setIsDarkMode] = useState(false);
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };
    checkDarkMode();
    // Opciono: Pratite promene ako koristite MutationObserver za dinamičko prebacivanje tema
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect(); // Očisti observer
  }, []);


  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black py-12 md:py-20"> {/* Promenjen dark:to-dark u dark:to-black */}
      <div className="container my-12 mx-auto px-4 max-w-7xl">
        {/* Zaglavlje */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-12 text-center"
        >
          <motion.h1
            className="text-4xl md:text-5xl font-bold leading-tight text-gray-900 dark:text-white mb-4 md:mb-6" // Smanjen razmak na mobilnom
            variants={itemVariants}
          >
            Tvoj <span className="text-primary-600 dark:text-primary-400">Profil</span> {/* Dodata boja za dark mode */}
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl font-light text-gray-700 dark:text-gray-300 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Prati svoje aktivnosti i dobijaj bedževe za svaki uspeh koji postigneš. {/* Ispravljena greška u kucanju */}
          </motion.p>
        </motion.div>

        {/* Info o korisniku, Postignuća */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-12"> {/* Prilagođen razmak */}
          {/* Info o korisniku */}
          <AnimatedSection
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8 lg:col-span-1" // Prilagođen padding i span
            delay={0.1}
          >
            <div className="flex items-center mb-6">
              <div className="p-3 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full mr-4"> {/* Dodat margin desno */}
                <User size={32} />
              </div>
              {/* Omotač za ime i email da bi bili jedan ispod drugog */}
              <div>
                 <h2 className="text-2xl font-semibold text-gray-900 dark:text-white truncate"> {/* Truncate ako je predugačko */}
                    {userInfo.username || 'Korisnik'} {/* Prikaz 'Korisnik' ako ime nije učitano */}
                 </h2>
                 <p className="text-gray-600 dark:text-gray-400 text-sm truncate"> {/* Manji font i truncate */}
                    {userInfo.email || 'email@primer.com'} {/* Prikaz placeholder email-a */}
                 </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-6"> {/* Prilagođen gap i flex smer */}
              <Button size="md" className="w-full sm:w-auto">Izmeni Profil</Button> {/* Prevedeno */}
              <Button
                onClick={() => {
                  localStorage.removeItem('token');
                  window.location.reload(); // Ponovo učitaj stranicu da bi se primetila odjava
                }}
                variant="outline"
                size="md"
                className="w-full sm:w-auto"
              >
                Odjavi se {/* Prevedeno */}
              </Button>
            </div>
          </AnimatedSection>

          {/* Postignuća i Niz */}
          <AnimatedSection
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8 lg:col-span-2" // Prilagođen padding i span
            delay={0.2}
          >
            {/* Brojač Niza */}
            <div className="mb-6 flex items-center justify-center bg-gradient-to-r from-orange-400 to-red-500 text-white rounded-lg p-4 shadow-md">
              <Flame size={28} className="mr-3 animate-pulse" /> {/* Dodat razmak */}
              <div className="text-center">
                <h3 className="text-xl font-bold">{streak.count} Dana u Nizu</h3> {/* Prevedeno */}
                <p className="text-sm opacity-90">Trenutni skor</p> {/* Prevedeno */}
              </div>
            </div>

            {/* Postignuća */}
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Award size={24} className="mr-2 text-primary-600 dark:text-primary-400" /> {/* Dodata boja za dark mode */}
              Postignuća {/* Prevedeno */}
            </h3>
            {/* Skrolabilni kontejner za postignuća na manjim ekranima */}
            <div className="overflow-x-auto pb-2">
                <div className="flex space-x-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4 md:space-x-0"> {/* Horizontalni skrol na mob, grid na većim */}
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className="flex-shrink-0 w-64 md:w-auto bg-gray-50 dark:bg-gray-700 rounded-lg p-4 flex items-start space-x-3 md:space-x-4 hover:shadow-md transition-shadow duration-200" /* Dodat hover efekat */
                    >
                      <img
                        src={`${achievement.image}&w=64&h=64&fit=crop`} // Optimizovana veličina slike
                        alt={achievement.title}
                        className="w-12 h-12 md:w-16 md:h-16 object-cover rounded-md flex-shrink-0"
                        loading="lazy" // Učitavanje slika po potrebi
                      />
                      <div className="flex-grow">
                        <div className="flex items-center mb-1">
                          {React.cloneElement(achievement.icon, { size: 20 })} {/* Manja ikona */}
                          <h4 className="ml-2 text-base md:text-lg font-semibold text-gray-900 dark:text-white leading-tight"> {/* Prilagođen font i visina linije */}
                            {achievement.title}
                          </h4>
                        </div>
                        <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 mb-1"> {/* Manji font */}
                          {achievement.description}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400"> {/* Manji font */}
                          Osvojeno: {achievement.date} {/* Prevedeno */}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
            </div>
            {/* Dugme vidljivo samo ako ima više postignuća (primer logike) */}
            {achievements.length > 3 && (
                 <Button variant="link" className="mt-4 text-primary-600 dark:text-primary-400 px-0"> {/* Link stil */}
                    Prikaži sva Postignuća {/* Prevedeno */}
                 </Button>
            )}
          </AnimatedSection>
        </div>

        {/* Sekcija sa Grafikonima */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12"> {/* Prilagođen razmak */}
          {/* Grafikon Pridržavanja Rutine */}
          <AnimatedSection
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6" // Povećan shadow
            delay={0.2}
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Activity size={24} className="mr-2 text-emerald-600 dark:text-emerald-400" /> {/* Promenjena boja ikone */}
              Pridržavanje Rutine {/* Prevedeno */}
            </h3>
            <div className="h-64"> {/* Fiksna visina kontejnera */}
              <Line
                data={activityData}
                options={isDarkMode ? darkModeChartOptions : baseChartOptions} // Dinamičke opcije
              />
            </div>
          </AnimatedSection>

          {/* Grafikon Završetka Zadataka */}
          <AnimatedSection
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
            delay={0.3}
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <TrendingUp size={24} className="mr-2 text-blue-600 dark:text-blue-400" /> {/* Promenjena boja ikone */}
              Završetak Zadataka {/* Prevedeno */}
            </h3>
            <div className="h-64">
              <Bar
                data={progressData}
                options={isDarkMode ? darkModeChartOptions : baseChartOptions}
              />
            </div>
          </AnimatedSection>

          {/* Grafikon Kategorija Rutina */}
          <AnimatedSection
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
            delay={0.4}
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Brain size={24} className="mr-2 text-amber-600 dark:text-amber-400" /> {/* Promenjena ikona i boja */}
              Kategorije Rutina {/* Prevedeno */}
            </h3>
            <div className="h-64 flex items-center justify-center"> {/* Centriran Doughnut */}
              <Doughnut
                data={performanceData}
                options={doughnutOptions(isDarkMode)} // Koristi specifične opcije za doughnut
              />
            </div>
          </AnimatedSection>
        </div>

        {/* Sekcija Performansi AI Modela (Najveći Grafikon) */}
        <AnimatedSection
          className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 md:p-8" // Jači shadow, prilagođen padding
          delay={0.5}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4"> {/* Prilagođen layout i razmak */}
            <div>
              <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white flex items-center">
                <Cpu size={32} className="mr-3 text-primary-600 dark:text-primary-400" /> {/* Promenjena ikona */}
                Performanse AI Rutine {/* Prevedeno */}
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-2xl">
                Analiziraj efikasnost AI modela koji pokreću tvoje dnevne rutine i zadatke. {/* Prevedeno */}
              </p>
            </div>
            <div className="flex items-center gap-4 flex-shrink-0"> {/* Sprečava smanjivanje na manjim ekranima */}
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Zap className="w-5 h-5 text-primary-600 dark:text-primary-400 mr-1.5" /> {/* Promenjena ikona */}
                <span>Aktivni Modeli: {aiModelsData.datasets[0].data.length}</span> {/* Prevedeno */}
              </div>
              <Button variant="outline" size="sm">
                Prikaži Detalje Modela {/* Prevedeno */}
              </Button>
            </div>
          </div>

          {/* Kontejner za horizontalni bar grafikon */}
          <div className="h-[450px] md:h-[500px] w-full"> {/* Prilagođena visina */}
            <Bar
              data={aiModelsData}
              options={horizontalBarOptions(isDarkMode)} // Koristi specifične opcije
            />
          </div>

          {/* Kartice sa sažetkom performansi */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-8"> {/* Povećan razmak */}
            {/* Kartica: Najbolje Performanse */}
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800/50">
              <div className="text-blue-600 dark:text-blue-400 font-semibold mb-1">Najbolje Performanse</div> {/* Prevedeno */}
              <div className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">Praćenje Fitnesa</div> {/* Prevedeno */}
              <div className="text-sm text-gray-600 dark:text-gray-400">{aiModelsData.datasets[0].data[2]}% Performanse</div> {/* Prevedeno */}
            </div>
             {/* Kartica: Najpouzdaniji */}
            <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg border border-purple-200 dark:border-purple-800/50">
              <div className="text-purple-600 dark:text-purple-400 font-semibold mb-1">Najpouzdaniji</div> {/* Prevedeno */}
              <div className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">Optimizacija Rutine</div> {/* Prevedeno */}
              <div className="text-sm text-gray-600 dark:text-gray-400">{aiModelsData.datasets[0].reliability[0]}% Pouzdanost</div> {/* Prevedeno */}
            </div>
             {/* Kartica: Najveći Skup Podataka (Primer) */}
            <div className="bg-emerald-50 dark:bg-emerald-900/30 p-4 rounded-lg border border-emerald-200 dark:border-emerald-800/50">
              <div className="text-emerald-600 dark:text-emerald-400 font-semibold mb-1">Najveći Skup Podataka</div> {/* Prevedeno */}
              <div className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">Prioritetizacija Zadataka</div> {/* Prevedeno */}
              <div className="text-sm text-gray-600 dark:text-gray-400">30M+ Pod. Tačaka</div> {/* Prevedeno i skraćeno */}
            </div>
          </div>
        </AnimatedSection>
      </div>

      {/* Dekorativni elementi u pozadini (opciono) */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary-600/5 dark:bg-primary-400/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-secondary-600/5 dark:bg-secondary-400/5 rounded-full blur-3xl -z-10"></div> {/* Dodat još jedan sa drugom bojom */}
    </section>
  );
};

export default ProfilePage;

// Definicija tipa UserType (ako već ne postoji u ../types/UserType)
// interface UserType {
//   id: number;
//   username: string;
//   email: string;
//   // Dodajte ostala polja po potrebi
// }

// Definicija komponenti AnimatedSection i Button (ako već ne postoje)
// const AnimatedSection: React.FC<{ children: React.ReactNode, className?: string, delay?: number }> =
//   ({ children, className, delay = 0 }) => (
//   <motion.div
//     className={className}
//     initial="hidden"
//     whileInView="visible" // Animira se kada uđe u vidno polje
//     viewport={{ once: true, amount: 0.3 }} // Okida animaciju kada je 30% vidljivo, samo jednom
//     transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
//     variants={{
//       hidden: { opacity: 0, y: 30 },
//       visible: { opacity: 1, y: 0 },
//     }}
//   >
//     {children}
//   </motion.div>
// );

// const Button: React.FC<{ children: React.ReactNode, onClick?: () => void, variant?: 'solid' | 'outline' | 'link', size?: 'sm' | 'md' | 'lg', className?: string }> =
//   ({ children, onClick, variant = 'solid', size = 'md', className = '' }) => {
//     const baseStyle = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-900 focus:ring-primary-500 disabled:opacity-50 disabled:pointer-events-none";
//     const sizeStyles = {
//       sm: "px-3 py-1.5 text-sm",
//       md: "px-4 py-2 text-base",
//       lg: "px-6 py-3 text-lg",
//     };
//     const variantStyles = {
//       solid: "bg-primary-600 text-white hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600",
//       outline: "border border-primary-600 text-primary-600 hover:bg-primary-50 dark:border-primary-400 dark:text-primary-400 dark:hover:bg-primary-900/20",
//       link: "text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 underline-offset-4 hover:underline",
//     };

//     return (
//       <button
//         onClick={onClick}
//         className={`${baseStyle} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
//       >
//         {children}
//       </button>
//     );
// };
