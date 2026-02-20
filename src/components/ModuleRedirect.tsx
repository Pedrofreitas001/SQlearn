import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { curriculum } from '@/data/curriculum';

export function ModuleRedirect() {
  const { moduleId } = useParams();
  const module = curriculum.find(m => m.id === moduleId);
  
  if (module && module.lessons.length > 0) {
    return <Navigate to={`/module/${moduleId}/lesson/${module.lessons[0].id}`} replace />;
  }
  
  return <Navigate to="/" replace />;
}
