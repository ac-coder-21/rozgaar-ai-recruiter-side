"use client"

import { useState } from "react"
import { FileText } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

export function JobForm() {
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [uniqueId] = useState<string>(uuidv4())
  const [title, setTitle] = useState<string>("")
  const [lpa, setLpa] = useState<string>("")
  const [company, setCompany] = useState<string>("")
  const [location, setLocation] = useState<string>("")
  const [email, setEmail] = useState<string>("")

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile && droppedFile.type === "application/pdf") {
      setFile(droppedFile)
      setError(null)
    } else {
      setError("Please upload a valid PDF file.")
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file || !title || !lpa || !company || !location || !email) {
      setError("Please fill in all the required fields and upload a valid PDF.");
      return;
    }

    const formData = new FormData();
    formData.append('pdf', file);
    formData.append('uniqueId', uniqueId);
    formData.append('title', title);
    formData.append('lpa', lpa);
    formData.append('company', company);
    formData.append('location', location);
    formData.append('email', email);

    try {
      const response = await axios.post(`http://localhost:5000/api/jobs`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Form data submitted:', response.data);
      setError(null); // Clear error if successful
    } catch (error) {
      console.error('Error submitting form data:', error);
      setError('Error submitting the form. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl space-y-6">
      {/* Hidden input for unique ID */}
      <input type="hidden" name="uniqueId" value={uniqueId} />
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">New job</h1>
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">Job title</Label>
        <Input
          id="title"
          placeholder="Product designer, software engineer, etc..."
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="lpa">Expected LPA</Label>
        <Input
          id="lpa"
          placeholder="120,000"
          required
          value={lpa}
          onChange={(e) => setLpa(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="company">Company name</Label>
        <Input
          id="company"
          placeholder="Acme Inc."
          required
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          placeholder="San Francisco, CA"
          required
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email address</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="pdf">Upload a PDF</Label>
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => document.getElementById('pdf')?.click()}
          className="mt-4 flex h-32 w-full items-center justify-center rounded border-2 border-dashed border-gray-300 bg-white cursor-pointer"
        >
          <input
            id="pdf"
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={(e) => {
              const selectedFile = e.target.files?.[0] || null
              if (selectedFile && selectedFile.type === "application/pdf") {
                setFile(selectedFile)
                setError(null)
              } else {
                setFile(null)
                setError("Please upload a valid PDF file.")
              }
            }}
          />
          {file ? (
            <span className="text-sm text-gray-500">{file.name}</span>
          ) : (
            <p className="text-gray-500">Click or drag and drop a PDF here</p>
          )}
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>

      <Button type="submit" className="w-full">
        Submit job
      </Button>
    </form>
  )
}
