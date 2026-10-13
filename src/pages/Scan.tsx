import { useState, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon, Plate, TopBar, useToast } from '@/components/common';
import { SCAN_SAMPLES, getFood, mockAnalyze } from '@/data/foods';
import { useAppStore } from '@/store/useAppStore';
import { useCamera, type Facing } from '@/hooks/useCamera';

export default function Scan() {
  const navigate = useNavigate();
  const toast = useToast();
  const setLastPhoto = useAppStore((s) => s.setLastPhoto);

  const [facing, setFacing] = useState<Facing>('environment');
  const [useCam, setUseCam] = useState(true);
  const [photo, setPhoto] = useState<string | null>(null);
  const [sample, setSample] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const { videoRef, status, capture } = useCamera(useCam && !photo, facing);

  const preview = getFood(sample ?? 'salmon')!;
  const showVideo = !photo && useCam && status === 'live';

  const analyze = async () => {
    if (busy) return;
    const shot = photo ?? (showVideo ? capture() : null);
    setLastPhoto(shot);
    setBusy(true);
    const food = await mockAnalyze(sample ?? (shot ? undefined : 'salmon'));
    setBusy(false);
    navigate(`/result/${food.id}?src=scan`);
  };

  const onFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setPhoto(String(reader.result));
      toast('เลือกภาพแล้ว กดปุ่มถ่ายเพื่อวิเคราะห์');
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="page scan">
      <TopBar title="สแกนอาหาร"
        right={<button className="icon-btn" aria-label="แฟลช" onClick={() => toast('อุปกรณ์นี้ไม่รองรับแฟลชจากเว็บ')}><Icon name="flash" /></button>} />

      <div className="viewfinder">
        <span className="viewfinder__tag">AI จำลอง</span>
        <video ref={videoRef} playsInline muted hidden={!showVideo} className={facing === 'user' ? 'is-mirror' : ''} />
        {photo && <img src={photo} alt="ภาพอาหารที่เลือก" />}
        {!photo && !showVideo && (
          <div className="viewfinder__placeholder">
            <Plate food={preview} size={220} />
            {useCam && status === 'starting' && <span className="viewfinder__note">กำลังเปิดกล้อง…</span>}
            {useCam && status === 'unavailable' && <span className="viewfinder__note">เปิดกล้องไม่ได้ ใช้ภาพจากอัลบั้มหรือจานตัวอย่างแทน</span>}
          </div>
        )}
        <div className="viewfinder__frame" aria-hidden="true"><i /><i /><i /><i /></div>
        <div className="viewfinder__line" aria-hidden="true" />
        <span className="viewfinder__hint">วางอาหารให้อยู่ในกรอบ</span>
        {busy && <div className="analyzing"><div className="spinner" />กำลังวิเคราะห์อาหาร…</div>}
      </div>

      <div className="samples" role="radiogroup" aria-label="จานตัวอย่าง">
        <button role="radio" aria-checked={sample === null} className={sample === null ? 'is-active' : ''}
          onClick={() => { setSample(null); setUseCam(true); }}>
          <Icon name="camera" size={18} />กล้อง
        </button>
        {SCAN_SAMPLES.map((id) => {
          const f = getFood(id)!;
          return (
            <button key={id} role="radio" aria-checked={sample === id} className={sample === id ? 'is-active' : ''}
              onClick={() => { setSample(id); setPhoto(null); setUseCam(false); }}>
              <Plate food={f} size={24} />{f.name.split(' ')[0]}
            </button>
          );
        })}
      </div>

      <div className="controls">
        <label className="controls__side">
          <span><Icon name="image" /></span>อัลบั้ม
          <input type="file" accept="image/*" hidden onChange={onFile} />
        </label>
        <button className="shutter" onClick={analyze} disabled={busy} aria-label="ถ่ายภาพและวิเคราะห์"><i /></button>
        <button className="controls__side" onClick={() => {
          if (photo) { setPhoto(null); return; }
          setFacing((f) => (f === 'environment' ? 'user' : 'environment'));
        }}>
          <span><Icon name="flip" /></span>{photo ? 'ถ่ายใหม่' : 'สลับกล้อง'}
        </button>
      </div>
    </div>
  );
}
