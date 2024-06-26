import { ActionError, ActionFunction } from "@/lib/actions";
import { useState } from "react";

type CommentFormState = {
    loading: boolean;
    error: ActionError | null;
};

export type UseFormStateResult = [CommentFormState, (event: React.FormEvent<HTMLFormElement>) => Promise<void>];

export function useFormState(action: ActionFunction): UseFormStateResult {
    const [state, setState] = useState<CommentFormState>({
        loading: false,
        error: null,
    });

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setState({ loading: true, error: null });
        const form = event.currentTarget;
        const formData = new FormData(form);
        const result = await action(formData);
        if (result?.isError) {
            setState({ loading: false, error: result });
        } else {
            form.reset();
            setState({ loading: false, error: null });
        }
    };

    return [state, handleSubmit];
}