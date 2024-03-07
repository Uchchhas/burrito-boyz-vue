import { useErrorStore } from '@/stores';

export const handleCommonActions = async (actionCallback) => {
    const errorStore = useErrorStore();
    
    try {
        errorStore.setError();

        await actionCallback();
    } catch (error) {
        errorStore.setError(error);
    }
};