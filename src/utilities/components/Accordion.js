import React from "react";

const Accordion = ({ title, children, open, setOpen }) => {
	const isOpen = open === title;

	const toggleOpen = () => setOpen(isOpen ? "" : title);

	return (
		<div>
			<div
				className={`flex flex-col justify-between ${
					isOpen && "bg-slate-200 p-2 rounded-md"
				}`}
			>
				<div className="flex flex-row items-center">
					<button
						className="max-w-lg h-12 text-left py-2 px-4"
						onClick={toggleOpen}
					>
						{isOpen ? (
							<img
								className="w-8 h-8 bg-white rounded-full "
								src="/assets/icons/minus_icon.svg"
								alt="Minus"
							/>
						) : (
							<img
								className="w-6 h-6 ml-3 mr-1"
								src="/assets/icons/plus_icon.svg"
								alt="Plus"
							/>
						)}
					</button>
					<span className="font-semibold ml-1">{title}</span>
				</div>
				{isOpen && (
					<>
						<div className="py-4 ml-16 pl-1">{children}</div>{" "}
					</>
				)}
			</div>
		</div>
	);
};

export default Accordion;
