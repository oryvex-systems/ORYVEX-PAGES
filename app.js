import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabase = createClient(
  'https://wdimzayfvtlrxljpsvza.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkaW16YXlmdnRscnhsanBzdnphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYzMTQwMTYsImV4cCI6MjEwMTg5MDAxNn0.yTfnKJV2je1P4I12VNT1LZz78mF0ge9Y1ymtnoRqVfU'
);

const $ = (id) => document.getElementById(id);
const state = { user: null, systems: [], tasks: [], contacts: [] };

function safe(value='') {
  return String(value).replace(/[&<>'\"]/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','\"':'&quot;'}[c]));
}

function setMessage(id, message, type='') {
  const el = $(id);
  if (!el) return;
  el.textContent = message;
  el.className = `notice ${type}`;
  el.classList.toggle('hidden', !message);
}

function systemHref(system) {
  if (system.slug === 'tikladoy') return 'https://tikladoy.tr';
  if (system.slug === 'burgermy') return system.app_url || 'https://burgermy-v1.ofrkcaliskan.chatgpt.site';
  return system.app_url || '#';
}

function renderPublicSystems() {
  const systems = [
    ['TIKLADOY','Paket yemek platformu','https://tikladoy.tr','AKTİF'],
    ['BURGERMY','Sipariş ve operasyon sistemi','https://burgermy-v1.ofrkcaliskan.chatgpt.site','AKTİF'],
    ['WOODLIFE','Satış, teklif ve CRM','#','GELİŞTİRİLİYOR'],
    ['TEKNOM YAPI','Şantiye ve proje yönetimi','#','GELİŞTİRİLİYOR'],
    ['DOME LIGHTING','Teklif ve üretim yönetimi','#','PLANLANDI'],
    ['KAYNAŞALIM','Topluluk platformu','#','PLANLANDI'],
  ];
  $('public-systems').innerHTML = systems.map(([name,desc,href,status]) => `
    <a class="system" href="${href}" ${href !== '#' ? 'target="_blank" rel="noreferrer"' : ''}>
      <div><b>${name}</b><div class="muted">${desc}</div></div>
      <span class="status ${status==='AKTİF'?'active':'dev'}">${status==='AKTİF'?'● ':''}${status}</span>
    </a>`).join('');
}

function renderWorkspaceOptions() {
  if (!$('task-workspace')) return;
  $('task-workspace').innerHTML = state.systems.map(system => `<option value="${system.id}">${safe(system.name)}</option>`).join('');
}

function renderContacts() {
  const el = $('live-contacts');
  if (!el) return;
  el.innerHTML = state.contacts.map(contact => `
    <article class="task contact-item">
      <div class="task-top"><strong>${safe(contact.full_name)}</strong><span class="tag">${contact.status === 'new' ? 'YENİ' : safe(contact.status)}</span></div>
      <div class="contact-meta"><span>☎ ${safe(contact.phone)}</span><span>✉ ${safe(contact.email)}</span><span>${new Date(contact.created_at).toLocaleString('tr-TR')}</span></div>
      <div class="contact-note">${safe(contact.note)}</div>
    </article>`).join('') || '<div class="notice">Henüz müşteri talebi yok.</div>';
}

function renderPrivate() {
  const active = state.systems.filter(s => s.status === 'active').length;
  const pending = state.tasks.filter(t => ['todo','overdue'].includes(t.status)).length;
  $('metric-active').textContent = active;
  $('metric-systems').textContent = state.systems.length;
  $('metric-tasks').textContent = pending;

  $('live-systems').innerHTML = state.systems.map(system => {
    const href = systemHref(system);
    const canOpen = href !== '#';
    const label = system.status === 'active' ? 'AKTİF' : system.status === 'development' ? 'GELİŞTİRİLİYOR' : system.status.toUpperCase();
    const inner = `<div><b>${safe(system.name)}</b><div class="muted">${safe(system.description || '')}</div></div><span class="status ${system.status==='active'?'active':'dev'}">${system.status==='active'?'● ':''}${label}</span>`;
    return canOpen ? `<a class="system" href="${href}" target="_blank" rel="noreferrer">${inner}</a>` : `<div class="system">${inner}</div>`;
  }).join('') || '<div class="notice">Bu hesap için çalışma alanı bulunamadı.</div>';

  const statusLabel = {todo:'Yapılacak',in_progress:'Devam Ediyor',done:'Tamamlandı',overdue:'Geciken'};
  const priorityLabel = {low:'Düşük',medium:'Orta',high:'Yüksek',critical:'Kritik'};
  $('live-tasks').innerHTML = state.tasks.map(task => `
    <article class="task">
      <div class="task-top"><strong>${safe(task.title)}</strong><span class="priority gradient">${priorityLabel[task.priority] || task.priority}</span></div>
      <div class="muted" style="margin-top:8px">${safe(task.oryvex_workspaces?.name || 'ORYVEX')} · ${statusLabel[task.status] || task.status}${task.due_date ? ` · ${safe(task.due_date)}` : ''}</div>
    </article>`).join('') || '<div class="notice">Görev bulunamadı.</div>';

  renderWorkspaceOptions();
  renderContacts();
  const displayName = state.user?.user_metadata?.full_name || state.user?.email?.split('@')[0] || 'Kullanıcı';
  $('welcome-name').textContent = displayName;
  $('user-email').textContent = state.user?.email || '';
  $('ai-summary').innerHTML = `Şu anda <strong>${active} aktif sistem</strong>, <strong>${pending} bekleyen görev</strong> ve <strong>${state.contacts.filter(c => c.status === 'new').length} yeni müşteri talebi</strong> bulunuyor.`;
}

async function loadPrivateData() {
  const [systemsRes, tasksRes, contactsRes] = await Promise.all([
    supabase.from('oryvex_workspaces').select('id,slug,name,description,status,app_url,updated_at').order('name'),
    supabase.from('oryvex_tasks').select('id,title,status,priority,due_date,workspace_id,oryvex_workspaces(name)').order('due_date', { ascending: true, nullsFirst: false }),
    supabase.from('oryvex_contact_requests').select('id,full_name,phone,email,note,status,created_at').order('created_at', { ascending: false }).limit(30)
  ]);
  if (systemsRes.error) console.error(systemsRes.error);
  if (tasksRes.error) console.error(tasksRes.error);
  if (contactsRes.error) console.error(contactsRes.error);
  state.systems = systemsRes.data || [];
  state.tasks = tasksRes.data || [];
  state.contacts = contactsRes.data || [];
  renderPrivate();
}

function applySession(user) {
  state.user = user;
  const signedIn = Boolean(user);
  $('public-view').classList.toggle('hidden', signedIn);
  $('private-view').classList.toggle('hidden', !signedIn);
  $('userbar').classList.toggle('hidden', !signedIn);
  $('auth-panel').classList.add('hidden');
  if (signedIn) loadPrivateData();
}

function openAdminIfRequested() {
  if (window.location.hash === '#yonetim' && !state.user) {
    $('auth-panel').classList.remove('hidden');
    setTimeout(() => $('email').focus(), 50);
  }
}

window.addEventListener('hashchange', openAdminIfRequested);

$('login-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  setMessage('auth-message','Giriş yapılıyor...');
  const email = $('email').value.trim();
  const password = $('password').value;
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return setMessage('auth-message','Giriş başarısız. E-posta veya şifreyi kontrol edin.','error');
  if (data.user?.email !== 'ofrkcaliskan@gmail.com') {
    await supabase.auth.signOut();
    return setMessage('auth-message','Bu hesap ORYVEX yönetimine yetkili değil.','error');
  }
  setMessage('auth-message','Giriş başarılı.','success');
  history.replaceState(null,'',window.location.pathname);
  applySession(data.user);
});

$('logout').addEventListener('click', async () => {
  await supabase.auth.signOut();
  applySession(null);
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

$('contact-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  setMessage('contact-message','Mesajınız gönderiliyor...');
  const payload = {
    full_name: $('contact-name').value.trim(),
    phone: $('contact-phone').value.trim(),
    email: $('contact-email').value.trim(),
    note: $('contact-note').value.trim()
  };
  const { error } = await supabase.from('oryvex_contact_requests').insert(payload);
  if (error) return setMessage('contact-message','Mesaj gönderilemedi. Lütfen bilgileri kontrol edip tekrar deneyin.','error');
  $('contact-form').reset();
  setMessage('contact-message','Teşekkür ederiz. Mesajınız ORYVEX ekibine ulaştı.','success');
});

$('task-open').addEventListener('click', () => {
  $('task-form').classList.remove('hidden');
  $('task-title').focus();
});
$('task-cancel').addEventListener('click', () => {
  $('task-form').classList.add('hidden');
  setMessage('task-message','');
});
$('task-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!state.user) return;
  const workspace_id = $('task-workspace').value;
  const title = $('task-title').value.trim();
  if (!workspace_id || !title) return setMessage('task-message','Sistem ve görev başlığı zorunludur.','error');
  setMessage('task-message','Görev kaydediliyor...');
  const payload = { workspace_id, title, priority: $('task-priority').value, due_date: $('task-due').value || null, status: 'todo', created_by: state.user.id };
  const { error } = await supabase.from('oryvex_tasks').insert(payload);
  if (error) return setMessage('task-message','Görev kaydedilemedi: ' + error.message,'error');
  setMessage('task-message','Görev kaydedildi.','success');
  $('task-title').value = '';
  $('task-due').value = '';
  await loadPrivateData();
  setTimeout(() => $('task-form').classList.add('hidden'), 500);
});

renderPublicSystems();
const { data: { session } } = await supabase.auth.getSession();
const initialUser = session?.user?.email === 'ofrkcaliskan@gmail.com' ? session.user : null;
if (session?.user && !initialUser) await supabase.auth.signOut();
applySession(initialUser);
openAdminIfRequested();
supabase.auth.onAuthStateChange((_event, sessionData) => {
  const user = sessionData?.user?.email === 'ofrkcaliskan@gmail.com' ? sessionData.user : null;
  applySession(user);
});