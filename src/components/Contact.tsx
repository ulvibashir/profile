'use client'

import { motion } from 'framer-motion'

/* HIDDEN - contact form (re-enable when needed)
import { useState } from 'react'
import { FaExclamationTriangle } from 'react-icons/fa'

interface FormData {
  name: string;
  email: string;
  message: string;
  createdAt?: Date;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}
*/

const Contact = () => {
  /* HIDDEN - contact form state & handlers (re-enable when needed)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    let isValid = true

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
      isValid = false
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
      isValid = false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
      isValid = false
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please provide a valid email address'
      isValid = false
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
      isValid = false
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    setIsSubmitting(true)
    setError('')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Failed to submit message')
      setFormData({ name: '', email: '', message: '' })
      setSuccessMessage("Your message has been sent successfully! I'll get back to you soon.")
      setIsSubmitted(true)
      setTimeout(() => { setIsSubmitted(false) }, 5000)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Something went wrong. Please try again later.')
      }
      setSuccessMessage("While there was an issue with our contact system, you can reach me directly at ubashirov@outlook.com")
      setIsSubmitted(true)
      console.error('Error submitting form:', err)
    } finally {
      setIsSubmitting(false)
    }
  }
  */

  return (
    <section id="contact" className="py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-xl mx-auto text-center"
        >
          <p className="text-gray-700 text-base sm:text-lg mb-4">
            Feel free to reach out if you&apos;re looking for a professional iOS engineer with expertise in Swift and UIKit.
            I&apos;m open to new opportunities, collaborations, or freelance projects.
          </p>
          <a
            href="mailto:ubashirov@outlook.com"
            className="text-primary font-semibold text-lg hover:underline"
          >
            ubashirov@outlook.com
          </a>
        </motion.div>
      </div>

      {/* HIDDEN - contact form UI (re-enable when needed)
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-primary text-center mb-8 md:mb-12">Get In Touch</h2>
          <div className="max-w-md mx-auto">
            <div>
              <h3 className="text-xl font-bold mb-4 md:mb-6">Send a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                ... form fields ...
              </form>
            </div>
          </div>
        </motion.div>
      </div>
      */}
    </section>
  )
}

export default Contact