import React from "react";
import { Dialog } from "@headlessui/react";

const LocalizedModal = ({
	setOpen,
	title,
	message,
	actionText,
	cancelText,
	actionHandler,
}) => {
	return (
		<>
			<Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:w-full sm:max-w-lg">
				<div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
					<div className="sm:flex sm:items-start">
						<div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
							<Dialog.Title
								as="h3"
								className="text-base font-semibold leading-6 text-gray-900"
							>
								{title}
							</Dialog.Title>
							<div className="mt-2">
								<p className="text-sm text-gray-500">{message}</p>
							</div>
						</div>
					</div>
				</div>
				<div className="bg-gray-100 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
					{actionText && (
						<button
							type="button"
							className="inline-flex w-full justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-bold text-blue shadow-sm hover:bg-blue-700 text-white sm:ml-3 sm:w-auto"
							onClick={actionHandler}
						>
							{actionText}
						</button>
					)}
					<button
						type="button"
						className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
						onClick={() => setOpen(false)}
					>
						{cancelText}
					</button>
				</div>
			</Dialog.Panel>
		</>
	);
};

export default LocalizedModal;
