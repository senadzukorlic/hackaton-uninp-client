import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { User, Activity, TrendingUp, Clock, Brain, Zap, Cpu } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import { Line, Bar, Doughnut, Scatter } from 'react-chartjs-2';
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
import Button from '../components/Button';
import { UserType } from '../types/UserType';

// Registracija Chart.js komponenti
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const ProfilePage: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserType>({
    username: '',
    email: '',
  });
  const token = localStorage.getItem('token') || '';
  const decoded: { id: number } = jwtDecode(token);
  const userID = decoded.id;

  // Mock podaci o nedavnim aktivnostima (zameniti stvarnim API pozivom ako je potrebno)
  const recentActivities = [
    { id: 1, action: 'Završen zadatak: Projekat Alfa', timestamp: '2025-04-23 10:30' },
    { id: 2, action: 'Ažurirane informacije profila', timestamp: '2025-04-22 15:15' },
    { id: 3, action: 'Započet novi cilj: K2 ciljevi', timestamp: '2025-04-21 09:00' },
  ];

  const getUserInfo = async () => {
    await axios
      .get(`http://localhost:8080/api/users/${userID}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setUserInfo(res.data);
      })
      .catch((err) => console.error('Greška pri preuzimanju informacija o korisniku:', err));
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  // Podaci i opcije za grafikone
  const activityData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun'],
    datasets: [
      {
        label: 'Korisnička aktivnost',
        data: [65, 59, 80, 81, 56, 55],
        fill: false,
        borderColor: '#10b981',
        tension: 0.4,
      },
    ],
  };

  const progressData = {
    labels: ['Nedelja 1', 'Nedelja 2', 'Nedelja 3', 'Nedelja 4'],
    datasets: [
      {
        label: 'Završetak zadataka',
        data: [30, 45, 60, 75],
        backgroundColor: '#3b82f6',
        borderColor: '#3b82f6',
        borderWidth: 1,
      },
    ],
  };

  const performanceData = {
    labels: ['Projekti', 'Zadaci', 'Ciljevi'],
    datasets: [
      {
        data: [40, 35, 25],
        backgroundColor: ['#10b981', '#3b82f6', '#f59e0b'],
        borderColor: ['#fff'],
        borderWidth: 2,
      },
    ],
  };

  // Podaci o performansama AI modela
  const aiModelsData = {
    datasets: [
      {
        label: 'Performanse AI modela',
        data: [
          { x: 95, y: 88, r: 15, model: 'Obrada jezika' },
          { x: 78, y: 92, r: 20, model: 'Prepoznavanje slika' },
          { x: 85, y: 75, r: 25, model: 'Prediktivna analitika' },
          { x: 92, y: 95, r: 18, model: 'Generisanje prirodnog jezika' },
          { x: 88, y: 82, r: 22, model: 'Prepoznavanje govora' },
        ],
        backgroundColor: [
          'rgba(59, 130, 246, 0.6)',
          'rgba(139, 92, 246, 0.6)',
          'rgba(16, 185, 129, 0.6)',
          'rgba(245, 158, 11, 0.6)',
          'rgba(236, 72, 153, 0.6)',
        ],
        borderColor: [
          'rgba(59, 130, 246, 1)',
          'rgba(139, 92, 246, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(236, 72, 153, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#1f2937',
          usePointStyle: true,
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const model = context.raw.model;
            return `${model}: Tačnost ${context.raw.x}%, Pouzdanost ${context.raw.y}%`;
          },
        },
      },
    },
    scales: {
      x: {
        min: 50,
        max: 100,
        title: {
          display: true,
          text: 'Tačnost (%)',
          color: '#1f2937',
        },
        ticks: { color: '#1f2937' },
        grid: { color: '#e5e7eb' },
      },
      y: {
        min: 50,
        max: 100,
        title: {
          display: true,
          text: 'Pouzdanost (%)',
          color: '#1f2937',
        },
        ticks: { color: '#1f2937' },
        grid: { color: '#e5e7eb' },
      },
    },
  };

  const darkModeChartOptions = {
    ...chartOptions,
    plugins: {
      ...chartOptions.plugins,
      legend: {
        labels: {
          color: '#f3f4f6',
          usePointStyle: true,
        },
      },
    },
    scales: {
      x: {
        ...chartOptions.scales.x,
        title: {
          ...chartOptions.scales.x.title,
          color: '#f3f4f6',
        },
        ticks: { color: '#f3f4f6' },
        grid: { color: '#374151' },
      },
      y: {
        ...chartOptions.scales.y,
        title: {
          ...chartOptions.scales.y.title,
          color: '#f3f4f6',
        },
        ticks: { color: '#f3f4f6' },
        grid: { color: '#374151' },
      },
    },
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-dark py-20">
      <div className="container my-12 mx-auto px-4">
        {/* Zaglavlje */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-12"
        >
          <motion.h1
            className="text-4xl md:text-5xl font-bold leading-tight text-gray-900 dark:text-white mb-6"
            variants={itemVariants}
          >
            Korisnički <span className="text-primary-600">profil</span>
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl font-light text-gray-700 dark:text-gray-300 max-w-3xl"
            variants={itemVariants}
          >
            Pratite svoju aktivnost, napredak i performanse uz detaljnu analitiku.
          </motion.p>
        </motion.div>

        {/* Informacije o korisniku i nedavne aktivnosti */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Kartica sa informacijama o korisniku (maksimalna širina) */}
          <AnimatedSection
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 lg:col-span-2"
            delay={0.1}
          >
            <div className="flex items-center mb-6">
              <div className="p-3 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full">
                <User size={32} />
              </div>
              <h2 className="ml-4 text-2xl font-semibold text-gray-900 dark:text-white">
                {userInfo.username}
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6">{userInfo.email}</p>
            <div className="flex gap-4">
              <Button size="md">Izmeni profil</Button>
              <Button
                onClick={() => {
                  localStorage.removeItem('token');
                  window.location.reload();
                }}
                variant="outline"
                size="md"
              >
                Odjavi se
              </Button>
            </div>
          </AnimatedSection>

          {/* Kartica sa nedavnim aktivnostima */}
          <AnimatedSection
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8"
            delay={0.2}
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Clock size={24} className="mr-2 text-primary-600" />
              Nedavne aktivnosti
            </h3>
            <ul className="space-y-4">
              {recentActivities.map((activity) => (
                <li key={activity.id} className="text-gray-600 dark:text-gray-300">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{activity.timestamp}</p>
                </li>
              ))}
            </ul>
            <Button className="mt-4 text-primary-600 dark:text-primary-400">
              Pogledaj sve aktivnosti
            </Button>
          </AnimatedSection>
        </div>

        {/* Sekcija sa grafikonima */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Grafikon linije aktivnosti */}
          <AnimatedSection
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
            delay={0.2}
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Activity size={24} className="mr-2 text-primary-600" />
              Aktivnost tokom vremena
            </h3>
            <div className="h-64">
              <Line
                data={activityData}
                options={document.documentElement.classList.contains('dark') ? darkModeChartOptions : chartOptions}
              />
            </div>
          </AnimatedSection>

          {/* Grafikon stubića napretka */}
          <AnimatedSection
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
            delay={0.3}
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <TrendingUp size={24} className="mr-2 text-primary-600" />
              Napredak zadataka
            </h3>
            <div className="h-64">
              <Bar
                data={progressData}
                options={document.documentElement.classList.contains('dark') ? darkModeChartOptions : chartOptions}
              />
            </div>
          </AnimatedSection>

          {/* Grafikon krofne performansi */}
          <AnimatedSection
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
            delay={0.4}
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <TrendingUp size={24} className="mr-2 text-primary-600" />
              Metrike performansi
            </h3>
            <div className="h-64">
              <Doughnut
                data={performanceData}
                options={{
                  ...document.documentElement.classList.contains('dark') ? darkModeChartOptions : chartOptions,
                  cutout: '70%',
                }}
              />
            </div>
          </AnimatedSection>
        </div>

        {/* Nova sekcija performansi AI modela */}
        <AnimatedSection
          className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8"
          delay={0.5}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center">
                <Brain size={28} className="mr-3 text-blue-600" />
                Matrica performansi AI modela
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Vizualizacija performansi AI modela u različitim domenima
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <Cpu className="w-5 h-5 text-blue-600 mr-2" />
                <span className="text-sm text-gray-600 dark:text-gray-300">Aktivni modeli: 5</span>
              </div>
              <Button variant="outline" size="sm">
                Pogledaj detalje
              </Button>
            </div>
          </div>

          <div className="h-[500px] w-full">
            <Scatter
              data={aiModelsData}
              options={document.documentElement.classList.contains('dark') ? darkModeChartOptions : chartOptions}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <div className="text-blue-600 dark:text-blue-400 font-semibold">Najveća tačnost</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">Generisanje prirodnog jezika</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">95% stopa tačnosti</div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <div className="text-purple-600 dark:text-purple-400 font-semibold">Najpouzdaniji</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">Prepoznavanje slika</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">92% ocena pouzdanosti</div>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <div className="text-green-600 dark:text-green-400 font-semibold">Najveći skup podataka</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">Prediktivna analitika</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">25M uzoraka za obuku</div>
            </div>
          </div>
        </AnimatedSection>
      </div>

      {/* Dekorativni elementi pozadine */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-primary-600/5 rounded-full blur-3xl"></div>
    </section>
  );
};

export default ProfilePage;