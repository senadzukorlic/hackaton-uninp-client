import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { User, Activity, TrendingUp, Clock, Brain, Zap, Cpu, Flame, Award } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
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
import Button from '../components/Button';
import { UserType } from '../types/UserType';

// Register Chart.js components and datalabels plugin
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
  });
  const token = localStorage.getItem('token') || '';
  const decoded: { id: number } = jwtDecode(token);
  const userID = decoded.id;

  // Mock recent activities
  const recentActivities = [
    { id: 1, action: 'Completed AI-driven gym routine', timestamp: '2025-04-25 08:00' },
    { id: 2, action: 'Finished productivity task: Project Plan', timestamp: '2025-04-24 14:30' },
    { id: 3, action: 'Started learning module: AI Basics', timestamp: '2025-04-23 10:00' },
  ];

  // Mock achievements data
  const achievements = [
    {
      id: 1,
      title: 'Gym Warrior',
      description: 'Completed 30 consecutive days of AI-driven gym routines',
      icon: <Zap size={24} className="text-yellow-500" />,
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438', // Dumbbell image
      date: '2025-04-20',
    },
    {
      id: 2,
      title: 'Task Master',
      description: 'Completed 50 AI-assigned productivity tasks',
      icon: <Award size={24} className="text-blue-500" />,
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40', // Desk/workspace image
      date: '2025-04-15',
    },
    {
      id: 3,
      title: 'Learning Pro',
      description: 'Finished 10 AI-guided learning modules',
      icon: <Brain size={24} className="text-green-500" />,
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3', // Books/study image
      date: '2025-04-10',
    },
  ];

  // Mock streak data
  const streak = {
    count: 35, // 35 consecutive days
  };

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
      .catch((err) => console.error('Error fetching user info:', err));
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

  // Updated chart data reflecting AI-driven routine
  const activityData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Routine Adherence (%)',
        data: [70, 75, 80, 85, 90, 95], // Mock data showing increasing adherence
        fill: false,
        borderColor: '#10b981',
        tension: 0.4,
      },
    ],
  };

  const progressData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Task Completion Rate (%)',
        data: [60, 70, 85, 90], // Mock data showing task completion
        backgroundColor: '#3b82f6',
        borderColor: '#3b82f6',
        borderWidth: 1,
      },
    ],
  };

  const performanceData = {
    labels: ['Gym Routines', 'Productivity Tasks', 'Learning Modules'],
    datasets: [
      {
        data: [35, 40, 25], // Mock data for AI-driven categories
        backgroundColor: ['#10b981', '#3b82f6', '#f59e0b'],
        borderColor: ['#fff'],
        borderWidth: 2,
      },
    ],
  };

  const aiModelsData = {
    labels: [
      'Routine Optimization',
      'Task Prioritization',
      'Fitness Tracking',
      'Learning Path',
      'Motivation Analysis',
    ],
    datasets: [
      {
        label: 'Performance (%)',
        data: [92, 88, 95, 90, 85], // Mock data for AI model performance
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
        reliability: [90, 85, 93, 88, 80], // Mock reliability data
      },
    ],
  };

  // Base chart options
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
            const index = context.dataIndex;
            const dataset = context.dataset;
            const model = context.chart.data.labels[index];
            const performance = dataset.data[index];
            const reliability = dataset.reliability ? dataset.reliability[index] : null;
            return reliability
              ? `${model}: Performance ${performance}%, Reliability ${reliability}%`
              : `${context.dataset.label}: ${context.raw}`;
          },
        },
      },
      datalabels: {
        color: '#1f2937',
        anchor: 'end',
        align: 'end',
        formatter: (value: number) => value,
      },
    },
    scales: {
      x: {
        min: 0,
        max: 100,
        title: {
          display: true,
          text: 'Performance (%)',
          color: '#1f2937',
        },
        ticks: { color: '#1f2937' },
        grid: { color: '#e5e7eb' },
      },
      y: {
        title: {
          display: true,
          text: 'AI Model',
          color: '#1f2937',
        },
        ticks: { color: '#1f2937' },
        grid: { color: '#e5e7eb' },
      },
    },
  };

  // Dark mode chart options
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
      datalabels: {
        ...chartOptions.plugins.datalabels,
        color: '#f3f4f6',
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

  // Doughnut-specific options
  const doughnutOptions = {
    ...chartOptions,
    plugins: {
      ...chartOptions.plugins,
      datalabels: {
        color: '#fff',
        anchor: 'center',
        align: 'center',
        formatter: (value: number) => `${value}%`,
      },
    },
  };

  const darkModeDoughnutOptions = {
    ...darkModeChartOptions,
    plugins: {
      ...darkModeChartOptions.plugins,
      datalabels: {
        color: '#fff',
        anchor: 'center',
        align: 'center',
        formatter: (value: number) => `${value}%`,
      },
    },
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-dark py-20">
      <div className="container my-12 mx-auto px-4 max-w-7xl">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-12 text-center"
        >
          <motion.h1
            className="text-4xl md:text-5xl font-bold leading-tight text-gray-900 dark:text-white mb-6"
            variants={itemVariants}
          >
            Your <span className="text-primary-600">AI-Driven Profile</span>
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl font-light text-gray-700 dark:text-gray-300 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Track your AI-guided routines, achievements, and performance metrics.
          </motion.p>
        </motion.div>

        {/* User Info, Achievements, and Recent Activities */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* User Info */}
          <AnimatedSection
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8"
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
              <Button size="md">Edit Profile</Button>
              <Button
                onClick={() => {
                  localStorage.removeItem('token');
                  window.location.reload();
                }}
                variant="outline"
                size="md"
              >
                Log Out
              </Button>
            </div>
          </AnimatedSection>

          {/* Achievements and Streak */}
          <AnimatedSection
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 md:col-span-1 lg:col-span-2"
            delay={0.2}
          >
            {/* Streak Counter */}
            <div className="mb-6 flex items-center justify-center bg-gradient-to-r from-orange-400 to-red-500 text-white rounded-lg p-4">
              <Flame size={28} className="mr-2 animate-pulse" />
              <div>
                <h3 className="text-xl font-bold">{streak.count} Day Streak</h3>
                <p className="text-sm">Streak {streak.lastActive}</p>
              </div>
            </div>

            {/* Achievements */}
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Award size={24} className="mr-2 text-primary-600" />
              Achievements
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className="flex items-center bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
                >
                  <img
                    src={achievement.image}
                    alt={achievement.title}
                    className="w-16 h-16 object-cover rounded-md mr-4"
                  />
                  <div>
                    <div className="flex items-center mb-1">
                      {achievement.icon}
                      <h4 className="ml-2 text-lg font-semibold text-gray-900 dark:text-white">
                        {achievement.title}
                      </h4>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {achievement.description}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Earned: {achievement.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Button className="mt-4 text-primary-600 dark:text-primary-400">
              View All Achievements
            </Button>
          </AnimatedSection>

       
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <AnimatedSection
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
            delay={0.2}
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Activity size={24} className="mr-2 text-primary-600" />
              Routine Adherence
            </h3>
            <div className="h-64">
              <Line
                data={activityData}
                options={document.documentElement.classList.contains('dark') ? darkModeChartOptions : chartOptions}
              />
            </div>
          </AnimatedSection>

          <AnimatedSection
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
            delay={0.3}
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <TrendingUp size={24} className="mr-2 text-primary-600" />
              Task Completion
            </h3>
            <div className="h-64">
              <Bar
                data={progressData}
                options={document.documentElement.classList.contains('dark') ? darkModeChartOptions : chartOptions}
              />
            </div>
          </AnimatedSection>

          <AnimatedSection
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
            delay={0.4}
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <TrendingUp size={24} className="mr-2 text-primary-600" />
              Routine Categories
            </h3>
            <div className="h-64">
              <Doughnut
                data={performanceData}
                options={
                  document.documentElement.classList.contains('dark')
                    ? darkModeDoughnutOptions
                    : doughnutOptions
                }
              />
            </div>
          </AnimatedSection>
        </div>

        {/* AI Models Performance Section (Largest Chart) */}
        <AnimatedSection
          className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8"
          delay={0.5}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-3xl font-semibold text-gray-900 dark:text-white flex items-center">
                <Brain size={32} className="mr-3 text-blue-600" />
                AI Routine Performance
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300 max-w-2xl">
                Analyze the effectiveness of AI models powering your daily routines and tasks.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <Cpu className="w-5 h-5 text-blue-600 mr-2" />
                <span className="text-sm text-gray-600 dark:text-gray-300">Active Models: 5</span>
              </div>
              <Button variant="outline" size="sm">
                View Model Details
              </Button>
            </div>
          </div>

          <div className="h-[600px] w-full">
            <Bar
              data={aiModelsData}
              options={{
                ...document.documentElement.classList.contains('dark') ? darkModeChartOptions : chartOptions,
                indexAxis: 'y', // Horizontal bar
                plugins: {
                  ...chartOptions.plugins,
                  datalabels: {
                    color: document.documentElement.classList.contains('dark') ? '#f3f4f6' : '#1f2937',
                    anchor: 'end',
                    align: 'right',
                    formatter: (value: number, context: any) => {
                      const reliability = context.dataset.reliability[context.dataIndex];
                      return `${value}% (Rel: ${reliability}%)`;
                    },
                  },
                },
              }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <div className="text-blue-600 dark:text-blue-400 font-semibold">Top Performer</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">Fitness Tracking</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">95% Performance</div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <div className="text-purple-600 dark:text-purple-400 font-semibold">Most Reliable</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">Routine Optimization</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">90% Reliability</div>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <div className="text-green-600 dark:text-green-400 font-semibold">Largest Dataset</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">Task Prioritization</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">30M Data Points</div>
            </div>
          </div>
        </AnimatedSection>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-primary-600/5 rounded-full blur-3xl"></div>
    </section>
  );
};

export default ProfilePage;