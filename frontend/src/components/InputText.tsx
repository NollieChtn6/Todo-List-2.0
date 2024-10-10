import { FloatLabel } from "primereact/floatlabel";
import { InputText as PrimeInputText } from "primereact/inputtext";

type InputTextProps = {
	input: {
		id: string;
		value: string;
		className: string;
		onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
		required: boolean;
	};
	label: {
		htmlFor: string;
		text: string;
	};
};

export function InputText({ input, label }: InputTextProps) {
	return (
		<FloatLabel className="float-label">
			<PrimeInputText
				id={input.id}
				value={input.value}
				onChange={input.onChange}
				className={input.className}
				required={input.required}
			/>
			<label htmlFor={label.htmlFor}>{label.text}</label>
		</FloatLabel>
	);
}
