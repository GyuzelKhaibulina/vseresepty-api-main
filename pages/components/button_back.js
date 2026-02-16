"use client"
import { useRouter } from 'next/router';

export default function BackButton() {
  const router = useRouter();
  return (
    <button className='buttonOrangeSm' onClick={() => router.back()}>
      Вернуться назад
    </button>
  );
}