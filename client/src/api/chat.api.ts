export interface ChatConversation {
    id: number;
    product_id: string;
    buyer_id: string;
    seller_id: string;
    buyer_name?: string;
    buyer_avatar_url?: string;
    seller_name?: string;
    seller_avatar_url?: string;
}

export interface ChatHistoryMessage {
    id: number;
    conversation_id: number;
    sender_id: string;
    message: string;
    message_type: 'text' | 'image' | 'video' | 'audio' | 'file';
    status: 'sent' | 'delivered' | 'seen';
    created_at: string;
    attachment_url?: string;
    attachment_name?: string;
}

export interface ChatSocketMessage {
    type: 'message' | 'status' | 'typing' | 'stop_typing' | 'error';
    id?: number;
    conversation_id?: number;
    sender_id?: string;
    receiver_id?: string;
    message?: string;
    message_type?: ChatHistoryMessage['message_type'];
    status?: ChatHistoryMessage['status'];
    created_at?: string;
    message_id?: number;
    attachment_url?: string;
    attachment_name?: string;
}

const CHAT_API_BASE_URL =
    import.meta.env.VITE_CHAT_API_BASE_URL?.replace(/\/$/, '') || 'http://localhost:8000';

const CHAT_WS_BASE_URL =
    import.meta.env.VITE_CHAT_WS_BASE_URL?.replace(/\/$/, '') ||
    CHAT_API_BASE_URL.replace(/^http/, 'ws');

async function chatRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
    const isFormData = options.body instanceof FormData;
    const response = await fetch(`${CHAT_API_BASE_URL}${path}`, {
        ...options,
        headers: {
            ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
            ...(options.headers || {}),
        },
    });

    const payload = await response.json().catch(() => null);
    if (!response.ok) {
        const message = payload?.detail || payload?.message || `Chat request failed (${response.status})`;
        throw new Error(String(message));
    }

    return payload as T;
}

export const chatApi = {
    async uploadFile(file: File) {
        const formData = new FormData();
        formData.append('file', file);
        const result = await chatRequest<{ url: string; name: string; content_type: string }>('/chat/upload', {
            method: 'POST',
            body: formData,
        });
        return { ...result, url: `${CHAT_API_BASE_URL}${result.url}` };
    },

    listConversations(userId: string) {
        return chatRequest<ChatConversation[]>(`/chat/user/${encodeURIComponent(userId)}/conversations`);
    },

    startConversation(productId: string, buyerId: string, sellerId: string, metadata?: {
        buyerName?: string;
        buyerAvatarUrl?: string;
        sellerName?: string;
        sellerAvatarUrl?: string;
    }) {
        return chatRequest<ChatConversation>('/chat/start', {
            method: 'POST',
            body: JSON.stringify({
                product_id: productId,
                buyer_id: buyerId,
                seller_id: sellerId,
                buyer_name: metadata?.buyerName,
                buyer_avatar_url: metadata?.buyerAvatarUrl,
                seller_name: metadata?.sellerName,
                seller_avatar_url: metadata?.sellerAvatarUrl,
            }),
        });
    },

    getMessages(conversationId: number) {
        return chatRequest<ChatHistoryMessage[]>(`/chat/${conversationId}/messages?limit=100&offset=0`);
    },

    openSocket(userId: string) {
        return new WebSocket(`${CHAT_WS_BASE_URL}/ws/${encodeURIComponent(userId)}`);
    },
};