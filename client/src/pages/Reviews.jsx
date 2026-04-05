const REVIEWS = [
  { name: 'Алия М.', doctor: 'Иванова Анна Сергеевна', text: 'Очень внимательный врач, всё подробно объяснила. Рекомендую!', rating: 5, date: '12.03.2025' },
  { name: 'Дмитрий К.', doctor: 'Петров Дмитрий Олегович', text: 'Профессионал своего дела, быстро поставил диагноз.', rating: 5, date: '18.03.2025' },
  { name: 'Сауле Н.', doctor: 'Сидорова Елена Павловна', text: 'Хороший специалист, но пришлось подождать. В целом доволен.', rating: 4, date: '25.03.2025' },
  { name: 'Иван Р.', doctor: 'Козлов Артём Игоревич', text: 'Отличная клиника, современное оборудование, вежливый персонал.', rating: 5, date: '01.04.2025' },
  { name: 'Мадина Т.', doctor: 'Морозова Татьяна Юрьевна', text: 'Педиатр от бога! Ребёнок не боится идти на приём.', rating: 5, date: '03.04.2025' },
  { name: 'Олег В.', doctor: 'Захаров Игорь Витальевич', text: 'Грамотный офтальмолог, подобрал правильные линзы с первого раза.', rating: 4, date: '04.04.2025' },
];

export default function Reviews() {
  return (
    <div className="container">
      <div className="section-title">Отзывы</div>
      <div className="section-sub">Что говорят наши пациенты</div>

      <div className="cards-grid">
        {REVIEWS.map((r, i) => (
          <div key={i} className="card">
            <div style={{ fontSize: '.75rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: '#767676' }}>
              {r.doctor}
            </div>
            <div style={{ fontSize: '1.1rem' }}>
              {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
            </div>
            <div style={{ fontSize: '.92rem', lineHeight: 1.6 }}>{r.text}</div>
            <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', fontSize: '.78rem', color: '#767676' }}>
              <span>— {r.name}</span>
              <span>{r.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}