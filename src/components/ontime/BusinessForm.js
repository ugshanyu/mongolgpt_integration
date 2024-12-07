// components/BusinessForm.js
'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function BusinessForm() {
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    location: '',
    phone: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/ontime/business`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.status === 'success') {
        setIsSuccess(true);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Алдаа гарлаа');
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 8);
    setFormData(prev => ({ ...prev, phone: value }));
  };

  if (isSuccess) {
    return (
      <div className="max-w-md mx-auto p-8 bg-white rounded-xl shadow-lg text-center">
        <div className="mb-6">
          <svg 
            className="mx-auto h-16 w-16 text-green-500" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Захиалга амжилттай илгээгдлээ
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
        Онтайм програм суулгах захиалга
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-base font-semibold text-gray-800 mb-2">
            Бизнесийн үйл ажиллагаа явуулж буй байршил
          </label>
          <select
            value={formData.location}
            onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
            className="w-full p-3 border-2 border-gray-200 rounded-lg text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
            required
          >
            <option value="">Байршил сонгоно уу</option>
            <optgroup label="Улаанбаатар">
              <option value="bagakhangai">Багахангай</option>
              <option value="baganuur">Багануур</option>
              <option value="bayangol">Баянгол</option>
              <option value="bayanzurkh">Баянзүрх</option>
              <option value="chingeltei">Чингэлтэй</option>
              <option value="khan-uul">Хан Уул</option>
              <option value="nalaikh">Налайх</option>
              <option value="songino-khairkhan">Сонгино хайрхан</option>
              <option value="sukhbaatar">Сүхбаатар</option>
            </optgroup>
            <optgroup label="Орон нутаг">
              <option value="arkhangai">Архангай</option>
              <option value="bayankhongor">Баянхонгор</option>
              <option value="bayan-olgii">Баян-Өлгий</option>
              <option value="bulgan">Булган</option>
              <option value="darkhan-uul">Дархан-Уул</option>
              <option value="dornod">Дорнод</option>
              <option value="dornogovi">Дорноговь</option>
              <option value="dundgovi">Дундговь</option>
              <option value="govi-altai">Говь-Алтай</option>
              <option value="govisumber">Говьсүмбэр</option>
              <option value="khentii">Хэнтий</option>
              <option value="khovd">Ховд</option>
              <option value="khovsgol">Хөвсгөл</option>
              <option value="orkhon">Орхон</option>
              <option value="omnogovi">Өмнөговь</option>
              <option value="ovorkhangai">Өвөрхангай</option>
              <option value="selenge">Сэлэнгэ</option>
              <option value="sukhbaatar-aimag">Сүхбаатар</option>
              <option value="tov">Төв</option>
              <option value="uvs">Увс</option>
              <option value="zavkhan">Завхан</option>
            </optgroup>
          </select>
        </div>

        <div>
          <label className="block text-base font-semibold text-gray-800 mb-2">
            Утасны дугаар
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={handlePhoneChange}
            className="w-full p-3 border-2 border-gray-200 rounded-lg text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
            placeholder="99887766"
            pattern="[0-9]{8}"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full p-4 text-white rounded-lg font-semibold text-lg transition-colors ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
          }`}
        >
          {loading ? 'Илгээж байна...' : 'Илгээх'}
        </button>
      </form>
    </div>
  );
}