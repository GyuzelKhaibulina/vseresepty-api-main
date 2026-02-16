"use client"
import { useRouter } from 'next/router';

export default function ReloadButton() {

  const router = useRouter();

  const refreshPage = () => {
    router.reload();
  };
  return (
    <button className='buttonOrangeSm' onClick={refreshPage}>
      Обновить страницу
    </button>
  );
}