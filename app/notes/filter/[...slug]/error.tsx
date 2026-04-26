'use client';

interface ErrorProps {
  error: Error;
}

export default function ErrorMessage({ error }: ErrorProps) {
  return <p>Could not fetch note details. {error.message}</p>;
}
