import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

const difficulties = [
	{
		key: "easy",
		label: "Easy",
		color: "from-green-400/20 to-emerald-400/20",
		borderColor: "border-green-400/40",
		glowColor: "shadow-green-400/20",
		icon: "🟢",
		description: [
			"More hints available",
			"Extended time limits",
			"Simpler problems",
			"Visual aids provided",
		],
	},
	{
		key: "medium",
		label: "Medium",
		color: "from-yellow-400/20 to-orange-400/20",
		borderColor: "border-yellow-400/40",
		glowColor: "shadow-yellow-400/20",
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
		color: "from-red-400/20 to-pink-400/20",
		borderColor: "border-red-400/40",
		glowColor: "shadow-red-400/20",
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
						"text-2xl font-bold text-green-400 mb-2",
						"drop-shadow-lg font-mono"
					)}
				>
					$ Choose Your Challenge
				</h2>
				<p className="text-green-300/70 text-base font-mono">
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
										"ring-2 ring-green-400/50 shadow-lg",
										"bg-green-400/10 border-green-400/50",
										"shadow-green-400/20"
								  )
								: cn(
										"border-green-700/30 bg-black/30",
										"hover:border-green-400/40 hover:shadow-green-400/10"
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
											? "text-green-300 drop-shadow-lg"
											: "text-green-400"
									)}
								>
									<div
										className={cn(
											"w-2 h-2 rounded-full border",
											selected === diff.key
												? "bg-green-300 border-green-300 shadow-sm"
												: "border-green-400/50"
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
												? "text-green-200/90"
												: "text-green-300/70"
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
					"bg-gradient-to-r from-green-600 to-emerald-600",
					"hover:from-green-500 hover:to-emerald-500",
					"text-black shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-400/30",
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