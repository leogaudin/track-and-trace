import { Skeleton, Stack } from "@mui/material";

export default function SkeletonTable({ rows = 1 }) {
	return (
		<Stack direction={'column'} spacing={1}>
			{[...Array(rows)].map((row, i) => (
				<Skeleton
					key={i}
					variant='rounded'
					height={50}
				/>
			))}
		</Stack>
	);
}
