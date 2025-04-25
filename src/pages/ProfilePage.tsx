import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { User, Activity, TrendingUp, Clock, Brain, Cpu } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import Button from '../components/Button';
import { UserType } from '../types/UserType';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
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

  // Mock recent activity data
  const recentActivities = [
    { id: 1, action: 'Completed Task: Project Alpha', timestamp: '2025-04-23 10:30 AM' },
    { id: 2, action: 'Updated Profile Information', timestamp: '2025-04-22 3:15 PM' },
    { id: 3, action: 'Started New Goal: Q2 Objectives', timestamp: '2025-04-21 9:00 AM' },
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

  // Chart data
  const activityData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'User Activity',
        data: [65, 59, 80, 81, 56, 55],
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
        label: 'Task Completion',
        data: [30, 45, 60, 75],
        backgroundColor: '#3b82f6',
        borderColor: '#3b82f6',
        borderWidth: 1,
      },
    ],
  };

  const performanceData = {
    labels: ['Projects', 'Tasks', 'Goals'],
    datasets: [
      {
        data: [40, 35, 25],
        backgroundColor: ['#10b981', '#3b82f6', '#f59e0b'],
        borderColor: ['#fff'],
        borderWidth: 2,
      },
    ],
  };

  // AI Models Performance Data for Horizontal Bar Chart
  const aiModelsData = {
    labels: [
      'Language Processing',
      'Image Recognition',
      'Predictive Analytics',
      'Natural Language Generation',
      'Speech Recognition',
    ],
    datasets: [
      {
        label: 'Accuracy (%)',
        data: [95, 78, 85, 92, 88],
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
      {
        label: 'Reliability (%)',
        data: [88, 92, 75, 95, 82],
        backgroundColor: 'rgba(16, 185, 129, 0.6)',
        borderColor: 'rgba(16, 185, 129, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    indexAxis: 'y' as const, // Makes the bar chart horizontal
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#1f2937',
          usePointStyle: true,
        },
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const datasetLabel = context.dataset.label || '';
            const value = context.parsed.x;
            return `${datasetLabel}: ${value}%`;
          },
        },
      },
      datalabels: {
        // Add data labels to bars
        anchor: 'end' as const,
        align: 'end' as const,
        color: '#1f2937',
        font: {
          weight: 'bold' as const,
        },
        formatter: (value: number) => `${value}%`,
      },
    },
    scales: {
      x: {
        min: 0,
        max: 100,
        title: {
          display: true,
          text: 'Percentage (%)',
          color: '#1f2937',
        },
        ticks: {
          color: '#1f2937',
          callback: (value: number) => `${value}%`,
        },
        grid: { color: '#e5e7eb' },
      },
      y: {
        title: {
          display: true,
          text: 'AI Models',
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
        ticks: {
          ...chartOptions.scales.x.ticks,
          color: '#f3f4f6',
        },
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
        {/* Header */}
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
            User <span className="text-primary-600">Profile</span>
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl font-light text-gray-700 dark:text-gray-300 max-w-3xl"
            variants={itemVariants}
          >
            Track your activity, progress, and performance with insightful analytics.
          </motion.p>
        </motion.div>

        {/* User Info and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* User Info Card (Max Width) */}
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
              <Button size="md">Edit Profile</Button>
              <Button
                onClick={() => {
                  localStorage.removeItem('token');
                  window.location.reload();
                }}
                variant="outline"
                size="md"
              >
                Logout
              </Button>
            </div>
          </AnimatedSection>

          {/* Recent Activity Card */}
          <AnimatedSection
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8"
            delay={0.2}
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Clock size={24} className="mr-2 text-primary-600" />
              Recent Activity
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
              View All Activity
            </Button>
          </AnimatedSection>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Activity Line Chart */}
          <AnimatedSection
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
            delay={0.2}
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Activity size={24} className="mr-2 text-primary-600" />
              Activity Over Time
            </h3>
            <div className="h-64">
              <Line
                data={activityData}
                options={document.documentElement.classList.contains('dark') ? darkModeChartOptions : chartOptions}
              />
            </div>
          </AnimatedSection>

          {/* Progress Bar Chart */}
          <AnimatedSection
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
            delay={0.3}
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <TrendingUp size={24} className="mr-2 text-primary-600" />
              Task Progress
            </h3>
            <div className="h-64">
              <Bar
                data={progressData}
                options={document.documentElement.classList.contains('dark') ? darkModeChartOptions : chartOptions}
              />
            </div>
          </AnimatedSection>

          {/* Performance Doughnut Chart */}
          <AnimatedSection
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
            delay={0.4}
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <TrendingUp size={24} className="mr-2 text-primary-600" />
              Performance Metrics
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

        {/* AI Models Performance Section */}
        <AnimatedSection
          className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8"
          delay={0.5}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center">
                <Brain size={28} className="mr-3 text-blue-600" />
                AI Models Performance Matrix
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Visualization of AI model performance across different domains
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <Cpu className="w-5 h-5 text-blue-600 mr-2" />
                <span className="text-sm text-gray-600 dark:text-gray-300">Active Models: 5</span>
              </div>
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </div>
          </div>

          <div className="h-[500px] w-full">
            <Bar
              data={aiModelsData}
              options={document.documentElement.classList.contains('dark') ? darkModeChartOptions : chartOptions}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <div className="text-blue-600 dark:text-blue-400 font-semibold">Highest Accuracy</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">Natural Language Generation</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">95% accuracy rate</div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <div className="text-purple-600 dark:text-purple-400 font-semibold">Most Reliable</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">Image Recognition</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">92% reliability score</div>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <div className="text-green-600 dark:text-green-400 font-semibold">Largest Dataset</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">Predictive Analytics</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">25M training samples</div>
            </div>
          </div>
        </AnimatedSection>
      </div>

      {/* Decorative background elements */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-primary-600/5 rounded-full blur-3xl"></div>
    </section>
  );
};

export default ProfilePage;