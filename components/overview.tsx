"use client"

import React from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis} from "recharts"

interface OverviewProps {
  data: any[]
}

export const Overview: React.FC<OverviewProps> = ({
  data
}) => { 
  
  return (
    <ResponsiveContainer>
      <BarChart>
        <XAxis />
        <YAxis />
      </BarChart>
    </ResponsiveContainer>
  )
}