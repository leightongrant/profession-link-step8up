export const seedData = {
  Users: [
    {
      user_id: 1,
      name: 'Alice Johnson',
      email: 'alice.law@example.com',
      password_hash: 'hashed_pw_1',
      role: 'lawyer',
      location: 'London, UK',
      created_at: '2025-11-01T10:00:00Z',
    },
    {
      user_id: 2,
      name: 'Brian Smith',
      email: 'brian.acc@example.com',
      password_hash: 'hashed_pw_2',
      role: 'accountant',
      location: 'Manchester, UK',
      created_at: '2025-11-02T11:00:00Z',
    },
    {
      user_id: 3,
      name: 'Clara Evans',
      email: 'clara.client@example.com',
      password_hash: 'hashed_pw_3',
      role: 'client',
      location: 'Grantham, UK',
      created_at: '2025-11-03T12:00:00Z',
    },
    {
      user_id: 4,
      name: 'David Admin',
      email: 'admin@example.com',
      password_hash: 'hashed_pw_4',
      role: 'admin',
      location: 'Newark, UK',
      created_at: '2025-11-04T13:00:00Z',
    },
  ],

  Profiles: [
    {
      profile_id: 1,
      user_id: 1,
      specialization: 'Corporate Law',
      experience_years: 8,
      bio: 'Specialist in contract drafting and compliance for SMEs.',
      rating_avg: 4.7,
      profile_photo_url: 'https://example.com/photos/alice.jpg',
      phone_number: '+44 7000 111111',
    },
    {
      profile_id: 2,
      user_id: 2,
      specialization: 'Tax Accounting',
      experience_years: 5,
      bio: 'Helping businesses with tax planning and compliance.',
      rating_avg: 4.5,
      profile_photo_url: 'https://example.com/photos/brian.jpg',
      phone_number: '+44 7000 222222',
    },
  ],

  Services: [
    {
      service_id: 1,
      profile_id: 1,
      title: 'Contract Review',
      description:
        'Detailed review of business contracts with risk assessment.',
      price_range: '£200–£500',
      availability: 'Weekdays 9–5',
      created_at: '2025-11-05T09:00:00Z',
    },
    {
      service_id: 2,
      profile_id: 1,
      title: 'Compliance Advisory',
      description: 'Guidance on regulatory compliance for startups.',
      price_range: '£300–£600',
      availability: 'Weekdays 10–4',
      created_at: '2025-11-06T09:00:00Z',
    },
    {
      service_id: 3,
      profile_id: 2,
      title: 'Tax Filing',
      description: 'Preparation and submission of annual tax returns.',
      price_range: '£150–£400',
      availability: 'Weekdays 9–6',
      created_at: '2025-11-07T09:00:00Z',
    },
  ],

  Bookings: [
    {
      booking_id: 1,
      service_id: 1,
      client_id: 3,
      status: 'pending',
      message: 'Need a contract reviewed before signing with a supplier.',
      created_at: '2025-11-10T14:00:00Z',
    },
    {
      booking_id: 2,
      service_id: 3,
      client_id: 3,
      status: 'confirmed',
      message: 'Help with filing my company’s tax return.',
      created_at: '2025-11-11T15:00:00Z',
    },
  ],

  Reviews: [
    {
      review_id: 1,
      service_id: 1,
      client_id: 3,
      rating: 5,
      comment: 'Alice was thorough and explained everything clearly.',
      created_at: '2025-11-12T16:00:00Z',
    },
    {
      review_id: 2,
      service_id: 3,
      client_id: 3,
      rating: 4,
      comment:
        'Brian handled my tax filing efficiently, though communication could be faster.',
      created_at: '2025-11-13T17:00:00Z',
    },
  ],
}
