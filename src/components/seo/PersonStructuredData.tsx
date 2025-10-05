interface PersonStructuredDataProps {
  person: {
    "@context": string;
    "@type": string;
    name: string;
    jobTitle: string;
    description: string;
    url: string;
    sameAs: string[];
    knowsAbout: string[];
    alumniOf: any[];
    hasOccupation: any;
  };
}

export function PersonStructuredData({ person }: PersonStructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(person)
      }}
    />
  );
}