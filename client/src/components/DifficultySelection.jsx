import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

const difficulties = [
	{
		key: "easy",
		label: "Easy",
		color: "from-cyan-400/20 to-blue-400/20",
		borderColor: "border-cyan-400/40",
		glowColor: "shadow-cyan-400/20",
		icon: "🟢",
		description: [
			"More hints available",
			"Extended time limits",
			"Leetcode type easy problems",
			"Visual aids provided",
		],
	},
	{
		key: "medium",
		label: "Medium",
		color: "from-blue-400/20 to-purple-400/20",
		borderColor: "border-blue-400/40",
		glowColor: "shadow-blue-400/20",
		icon: "🟡",
		description: [
			"Standard time limits",
			"Limited hints available",
			"Combined concepts",
			"Moderate complexity",
		],
	},
	{
		key: "hard",
		label: "Hard",
		color: "from-purple-400/20 to-cyan-400/20",
		borderColor: "border-purple-400/40",
		glowColor: "shadow-purple-400/20",
		icon: "🔴",
		description: [
			"Strict time limits",
			"No hints provided",
			"Complex optimization",
			"Advanced algorithms",
		],
	},
];

export default function DifficultySelection({ onSelect }) {
	const [selected, setSelected] = useState(null);

	return (
		<div className="w-full h-full flex flex-col items-center justify-center gap-6">
			<div className="text-center mb-4">
				<h2
					className={cn(
						"text-2xl font-bold text-cyan-400 mb-2",
						"drop-shadow-lg font-mono"
					)}
				>
					$ Choose Your Challenge
				</h2>
				<p className="text-cyan-300/70 text-base font-mono">
					Select the difficulty level that matches your skill
				</p>
			</div>

			<div className="grid grid-cols-3 gap-6 w-full max-w-4xl">
				{difficulties.map((diff) => (
					<Button
						key={diff.key}
						variant="ghost"
						className={cn(
							"h-auto p-6 flex flex-col items-center text-center font-mono",
							"rounded-xl border-2 transition-all duration-300",
							"bg-gradient-to-br backdrop-blur-sm min-h-[200px]",
							"hover:scale-[1.02] hover:shadow-lg hover:bg-transparent",
							selected === diff.key
								? cn(
										"ring-2 ring-cyan-400/50 shadow-lg",
										"bg-cyan-400/10 border-cyan-400/50",
										"shadow-cyan-400/20"
								  )
								: cn(
										"border-cyan-700/30 bg-black/30",
										"hover:border-cyan-400/40 hover:shadow-cyan-400/10"
								  )
						)}
						onClick={() => setSelected(diff.key)}
						aria-pressed={selected === diff.key}
					>
						<div className="flex flex-col items-center gap-4 h-full justify-between">
							<div className="flex flex-col items-center gap-3">
								<div className="text-3xl">{diff.icon}</div>
								<div
									className={cn(
										"text-xl font-bold flex items-center gap-2",
										selected === diff.key
											? "text-cyan-300 drop-shadow-lg"
											: "text-cyan-400"
									)}
								>
									<div
										className={cn(
											"w-2 h-2 rounded-full border",
											selected === diff.key
												? "bg-cyan-300 border-cyan-300 shadow-sm"
												: "border-cyan-400/50"
										)}
									/>
									{diff.label}
								</div>
							</div>

							<div className="flex flex-col gap-2 flex-1 justify-center">
								{diff.description.map((item, index) => (
									<div
										key={index}
										className={cn(
											"text-sm flex items-center gap-2",
											selected === diff.key
												? "text-cyan-200/90"
												: "text-cyan-300/70"
										)}
									>
										<div className="w-1 h-1 rounded-full bg-current opacity-60"></div>
										{item}
									</div>
								))}
							</div>
						</div>
					</Button>
				))}
			</div>

			<Button
				className={cn(
					"mt-6 px-8 py-3 text-base font-bold rounded-xl font-mono",
					"bg-gradient-to-r from-cyan-600 to-blue-600",
					"hover:from-cyan-500 hover:to-blue-500",
					"text-black shadow-lg shadow-cyan-500/25 hover:shadow-xl hover:shadow-cyan-400/30",
					"transition-all duration-300 hover:scale-105",
					"disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-none"
				)}
				disabled={!selected}
				onClick={() => selected && onSelect(selected)}
			>
				$ Start Interview &rarr;
			</Button>
		</div>
	);
}