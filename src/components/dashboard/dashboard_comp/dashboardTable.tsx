import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Recruitment {
  name: string;
  status: "Active" | "Closed";
  candidates: number;
  created: string;
}

const recruitments: Recruitment[] = [
  { name: "Senior Product Designer", status: "Active", candidates: 3, created: "Today" },
  { name: "Senior Product Manager", status: "Active", candidates: 6, created: "Yesterday" },
  { name: "Backend Engineer", status: "Closed", candidates: 12, created: "2 days ago" },
  { name: "UX Researcher", status: "Active", candidates: 4, created: "3 days ago" },
  { name: "Frontend Developer", status: "Closed", candidates: 7, created: "4 days ago" },
  { name: "Data Scientist", status: "Active", candidates: 5, created: "5 days ago" },
  { name: "Marketing Specialist", status: "Closed", candidates: 9, created: "6 days ago" },
  { name: "Full Stack Developer", status: "Active", candidates: 8, created: "7 days ago" },
  { name: "Business Analyst", status: "Closed", candidates: 6, created: "8 days ago" },
  { name: "Customer Success Manager", status: "Active", candidates: 7, created: "9 days ago" },
];

export function RecruitmentTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Candidates</TableHead>
          <TableHead>Created</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {recruitments.map((recruitment) => (
          <TableRow key={recruitment.name}>
            <TableCell className="font-medium">{recruitment.name}</TableCell>
            <TableCell>
              <Badge variant={recruitment.status === "Active" ? "default" : "secondary"}>
                {recruitment.status}
              </Badge>
            </TableCell>
            <TableCell>{recruitment.candidates}</TableCell>
            <TableCell className="text-gray-500">{recruitment.created}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

