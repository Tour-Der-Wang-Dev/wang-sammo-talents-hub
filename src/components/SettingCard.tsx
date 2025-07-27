
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Edit } from 'lucide-react';

interface SettingCardProps {
  title: string;
  description: string;
  value: string;
  onEdit: () => void;
}

const SettingCard: React.FC<SettingCardProps> = ({
  title,
  description,
  value,
  onEdit,
}) => {
  return (
    <Card className="w-full mb-4 transition-shadow hover:shadow-md">
      <CardHeader className="flex flex-row items-start justify-between pb-2">
        <div className="space-y-1">
          <h3 className="text-lg font-medium font-prompt text-wang-blue">{title}</h3>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onEdit}
          className="h-8 px-2 text-sm flex gap-1"
        >
          <Edit className="w-4 h-4" />
          <span>แก้ไข</span>
        </Button>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-2 font-sarabun">{description}</p>
        <p className="text-base font-medium font-sarabun">{value}</p>
      </CardContent>
    </Card>
  );
};

export default SettingCard;
