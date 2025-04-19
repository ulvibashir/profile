'use client'

import { motion } from 'framer-motion'
import { FaGithub, FaKaggle } from 'react-icons/fa'
import { SiHackerrank, SiLeetcode, SiHuggingface, SiMedium } from 'react-icons/si'

const profilesData = [
  {
    platform: 'GitHub',
    url: 'https://github.com/Ismat-Samadov',
    icon: <FaGithub />,
    username: 'Ismat-Samadov'
  },
  {
    platform: 'HackerRank',
    url: 'https://www.hackerrank.com/profile/IsmatSamadov',
    icon: <SiHackerrank />,
    username: 'IsmatSamadov'
  },
  {
    platform: 'Medium',
    url: 'https://medium.com/@ismatsamadov',
    icon: <SiMedium />,
    username: '@ismatsamadov'
  },
  {
    platform: 'Hugging Face',
    url: 'https://huggingface.co/IsmatS',
    icon: <SiHuggingface />,
    username: 'IsmatS'
  },
  {
    platform: 'Kaggle',
    url: 'https://www.kaggle.com/ismetsemedov',
    icon: <FaKaggle />,
    username: 'ismetsemedov'
  },
  {
    platform: 'LeetCode',
    url: 'https://leetcode.com/u/ismetsemedov/',
    icon: <SiLeetcode />,
    username: 'ismetsemedov'
  }
]

const TechProfiles = () => {
  return (
    <section id="tech-profiles" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-primary text-center mb-12">Tech Profiles</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {profilesData.map((profile, index) => (
              <ProfileCard 
                key={index}
                platform={profile.platform}
                url={profile.url}
                icon={profile.icon}
                username={profile.username}
                index={index}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

interface ProfileCardProps {
  platform: string
  url: string
  icon: React.ReactNode
  username: string
  index: number
}

const ProfileCard = ({ platform, url, icon, username, index }: ProfileCardProps) => {
  return (
    <motion.a 
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex flex-col items-center p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-shadow hover:bg-gray-100"
    >
      <div className="text-3xl text-primary mb-3">
        {icon}
      </div>
      <h3 className="font-bold mb-1">{platform}</h3>
      <p className="text-sm text-gray-600">{username}</p>
    </motion.a>
  )
}

export default TechProfiles
