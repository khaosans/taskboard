export async function generateStaticParams() {
  return [
    { dynamicPage: 'defi-dashboard' },
    { dynamicPage: 'portfolio' },
    { dynamicPage: 'robot-transformer-demo' },
  ];
}

export default function DynamicPage({ params }: { params: { dynamicPage: string } }) {
  return <div>This is the {params.dynamicPage} page</div>;
}