export function RestaurantDescription({
  description,
}: {
  description: string;
}) {
  return (
    <div className="bg-muted/30 p-4 rounded-lg">
      <p>{description}</p>
    </div>
  );
}
