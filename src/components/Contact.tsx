'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub } from 'react-icons/fa'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')
    
    // In a real application, you would send this data to your backend
    // This is a simulation for demonstration purposes
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Clear form and show success
      setFormData({ name: '', email: '', message: '' })
      setIsSubmitted(true)
      setTimeout(() => setIsSubmitted(false), 5000)
    } catch (err) {
      setError('Something went wrong. Please try again later.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="section-title text-center mb-12">Get In Touch</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-6">Contact Information</h3>
              
              <div className="space-y-4">
                <ContactItem 
                  icon={<FaEnvelope />}
                  label="Email"
                  value="ismetsemedov@gmail.com"
                  href="mailto:ismetsemedov@gmail.com"
                />
                <ContactItem 
                  icon={<FaPhone />}
                  label="Phone"
                  value="+994 50 478 7463"
                  href="tel:+994504787463"
                />
                <ContactItem 
                  icon={<FaLinkedin />}
                  label="LinkedIn"
                  value="linkedin.com/in/ismatsamadov"
                  href="https://az.linkedin.com/in/ismatsamadov"
                />
                <ContactItem 
                  icon={<FaGithub />}
                  label="GitHub"
                  value="github.com/Ismat-Samadov"
                  href="https://github.com/Ismat-Samadov"
                />
              </div>
              
              <div className="mt-8">
                <p className="text-gray-700">
                  Feel free to reach out if you're looking for a data professional with experience in fraud detection
                  and business intelligence. I'm open to new opportunities and collaborations.
                </p>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-6">Send a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-white font-medium py-3 px-6 rounded-md shadow-md hover:bg-blue-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
                
                {error && (
                  <p className="text-red-500 text-sm mt-2">{error}</p>
                )}
                
                {isSubmitted && (
                  <p className="text-green-500 text-sm mt-2">
                    Your message has been sent successfully! I'll get back to you soon.
                  </p>
                )}
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

interface ContactItemProps {
  icon: React.ReactNode
  label: string
  value: string
  href: string
}

const ContactItem = ({ icon, label, value, href }: ContactItemProps) => {
  return (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="contact-item group"
    >
      <span className="contact-icon">
        {icon}
      </span>
      <div>
        <p className="text-sm text-gray-600">{label}</p>
        <p className="font-medium group-hover:text-primary transition-colors">{value}</p>
      </div>
    </a>
  )
}

export default Contact