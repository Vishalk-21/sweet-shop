import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '../store/store'
import { orderAPI, productAPI, messageAPI } from '../services/api'

const initialProductForm = {
    name: '',
    description: '',
    price: '',
    category: 'Cakes',
    stock: '',
    is_available: true,
    image: null
}

const statuses = ['Pending', 'Accepted', 'Preparing', 'Ready', 'Delivered', 'Cancelled']
const activeStatuses = ['Pending', 'Accepted', 'Preparing', 'Ready']

const statusStyles = {
    Pending: 'bg-amber-400 text-gray-950 border-amber-200',
    Accepted: 'bg-sky-400 text-gray-950 border-sky-200',
    Preparing: 'bg-violet-400 text-gray-950 border-violet-200',
    Ready: 'bg-emerald-300 text-gray-950 border-emerald-100',
    Delivered: 'bg-green-500 text-gray-950 border-green-200',
    Cancelled: 'bg-rose-500 text-white border-rose-300'
}

const categoryOptions = ['Cakes', 'Donuts', 'Cupcakes', 'Pastries', 'Brownies']

export default function AdminDashboard() {
    const navigate = useNavigate()
    const { user } = useStore()
    const [stats, setStats] = useState(null)
    const [orders, setOrders] = useState([])
    const [products, setProducts] = useState([])
    const [messages, setMessages] = useState([])
    const [messageStats, setMessageStats] = useState(null)
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState('dashboard')
    const [selectedOrderId, setSelectedOrderId] = useState(null)
    const [newStatus, setNewStatus] = useState('')
    const [showProductForm, setShowProductForm] = useState(false)
    const [editingProduct, setEditingProduct] = useState(null)
    const [formData, setFormData] = useState(initialProductForm)

    useEffect(() => {
        if (!user || user.role !== 'owner') {
            navigate('/login')
            return
        }

        fetchDashboardData()
    }, [user, navigate])

    const fetchDashboardData = async () => {
        try {
            setLoading(true)
            console.log('🔄 Fetching dashboard data...', { 
              token: localStorage.getItem('authToken') ? 'Present' : 'Missing',
              user: user 
            })
            
            const [statsRes, ordersRes, productsRes, messagesRes, messageStatsRes] = await Promise.all([
                orderAPI.getDashboardStats(),
                orderAPI.getAllOrders(),
                productAPI.getAdminProducts(),
                messageAPI.getAllMessages(),
                messageAPI.getMessageStats()
            ])

            console.log('📊 Dashboard data received:', { statsRes, ordersRes, productsRes, messagesRes, messageStatsRes })

            const ordersArray = Array.isArray(ordersRes.data) ? ordersRes.data : (ordersRes.data?.orders || [])
            const productsArray = Array.isArray(productsRes.data) ? productsRes.data : (productsRes.data?.products || [])
            const messagesArray = Array.isArray(messagesRes.data) ? messagesRes.data : (messagesRes.data?.messages || [])

            setStats({ ...statsRes.data.stats, totalProducts: productsArray.length })
            setOrders(ordersArray)
            setProducts(productsArray)
            setMessages(messagesArray)
            setMessageStats(messageStatsRes.data?.stats || null)
        } catch (error) {
            console.error('❌ Failed to fetch dashboard data:', error)
            console.error('📋 Error details:', {
              message: error.message,
              status: error.response?.status,
              statusText: error.response?.statusText,
              data: error.response?.data,
              config: error.config?.url
            })
            alert('Failed to load dashboard data. Check console for details.')
        } finally {
            setLoading(false)
        }
    }

    const newOrders = useMemo(
        () => orders.filter((order) => activeStatuses.includes(order.status)),
        [orders]
    )

    const deliveredOrders = useMemo(
        () => orders.filter((order) => order.status === 'Delivered'),
        [orders]
    )

    const cancelledOrders = useMemo(
        () => orders.filter((order) => order.status === 'Cancelled'),
        [orders]
    )

    const readyOrders = useMemo(
        () => orders.filter((order) => order.status === 'Ready').length,
        [orders]
    )

    const todayOrders = useMemo(() => {
        const today = new Date().toDateString()
        return orders.filter((order) => new Date(order.createdAt).toDateString() === today).length
    }, [orders])

    // Calculate revenue from delivered orders only
    const deliveredRevenue = useMemo(
        () => deliveredOrders.reduce((total, order) => total + (order.total_amount || order.totalAmount || order.total || 0), 0),
        [deliveredOrders]
    )

    const handleUpdateStatus = async (orderId, status) => {
        if (!status) {
            alert('Please select a status')
            return
        }

        try {
            await orderAPI.updateOrderStatus(orderId, status)
            setSelectedOrderId(null)
            setNewStatus('')
            fetchDashboardData()
        } catch (error) {
            console.error('Failed to update order status:', error)
            alert('Failed to update order status')
        }
    }

    const handleSaveProduct = async () => {
        try {
            if (!formData.name || formData.price === '' || formData.stock === '') {
                alert('Please fill in all required fields')
                return
            }

            const formDataToSend = new FormData()
            formDataToSend.append('name', formData.name)
            formDataToSend.append('description', formData.description)
            formDataToSend.append('price', Number(formData.price))
            formDataToSend.append('stock', Number(formData.stock))
            formDataToSend.append('category', formData.category)
            formDataToSend.append('is_available', formData.is_available)
            
            // Add image if it's a File object
            if (formData.image instanceof File) {
                formDataToSend.append('image', formData.image)
            }

            if (editingProduct) {
                await productAPI.updateProduct(editingProduct._id, formDataToSend)
            } else {
                await productAPI.createProduct(formDataToSend)
            }

            setShowProductForm(false)
            setEditingProduct(null)
            setFormData(initialProductForm)
            fetchDashboardData()
        } catch (error) {
            console.error('Failed to save product:', error)
            alert('Failed to save product')
        }
    }

    const handleToggleAvailability = async (productId, currentStatus) => {
        try {
            await productAPI.updateProduct(productId, { is_available: !currentStatus })
            // Update local state immediately for better UX
            setProducts(products.map(p => 
              p._id === productId ? { ...p, is_available: !currentStatus } : p
            ))
        } catch (error) {
            console.error('Failed to update product availability:', error)
            const errorMessage = error.response?.data?.message || 'Failed to update product availability'
            alert(errorMessage)
            // Refresh data to ensure consistency
            fetchDashboardData()
        }
    }

    const handleDeleteProduct = async (productId) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return
        try {
            await productAPI.deleteProduct(productId)
            fetchDashboardData()
        } catch (error) {
            console.error('Failed to delete product:', error)
            alert('Failed to delete product')
        }
    }

    const handleEditProduct = (product) => {
        setEditingProduct(product)
        setFormData({
            name: product.name || '',
            description: product.description || '',
            price: product.price ?? '',
            category: product.category || 'Cakes',
            stock: product.stock ?? '',
            is_available: product.is_available !== false,
            image: product.image || null
        })
        setShowProductForm(true)
    }

    const handleAddNewProduct = () => {
        setEditingProduct(null)
        setFormData(initialProductForm)
        setShowProductForm(true)
    }

    const openStatusEditor = (order) => {
        setSelectedOrderId(order._id)
        setNewStatus(order.status)
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
                <div className="text-center">
                    <div className="sweet-loader mx-auto mb-5" aria-hidden="true" />
                    <div className="text-cream-50 text-xl font-semibold">Preparing owner dashboard...</div>
                </div>
            </div>
        )
    }

    return (
        <div className="owner-dashboard min-h-screen bg-gray-950 px-4 py-8 text-cream-50 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-stretch">
                    <motion.section
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="border border-white/10 bg-white/[0.06] p-6 shadow-2xl backdrop-blur rounded-lg sm:p-8"
                    >
                        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-gold-300">
                                    Sweet Shop Control Room
                                </p>
                                <h1 className="max-w-3xl text-4xl font-bold text-white sm:text-5xl">
                                    Owner Dashboard
                                </h1>
                                <p className="mt-3 max-w-2xl text-base leading-7 text-cream-200">
                                    Welcome back, {user?.name || 'Owner'}. Track fresh orders, completed deliveries, and product stock from one clean workspace.
                                </p>
                            </div>

                            <button
                                onClick={fetchDashboardData}
                                className="w-full rounded-md border border-gold-300/50 bg-gold-400 px-4 py-3 text-sm font-bold text-gray-950 transition hover:bg-gold-300 sm:w-auto"
                            >
                                Refresh
                            </button>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-3">
                            <SummaryPill label="New orders" value={newOrders.length} />
                            <SummaryPill label="Ready now" value={readyOrders} />
                            <SummaryPill label="Today" value={todayOrders} />
                        </div>
                    </motion.section>

                    <motion.section
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="overflow-hidden border border-white/10 bg-gray-900 shadow-2xl rounded-lg"
                    >
                        <SweetVideoLoop orderCount={newOrders.length} deliveredCount={deliveredOrders.length} />
                    </motion.section>
                </div>

                <div className="my-8 flex flex-wrap gap-3">
                    <TabButton active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')}>
                        Dashboard
                    </TabButton>
                    <TabButton active={activeTab === 'products'} onClick={() => setActiveTab('products')}>
                        Products
                    </TabButton>
                    <TabButton active={activeTab === 'orders'} onClick={() => setActiveTab('orders')}>
                        Orders
                    </TabButton>
                    <TabButton active={activeTab === 'messages'} onClick={() => setActiveTab('messages')}>
                        📧 Messages
                    </TabButton>
                </div>

                <AnimatePresence mode="wait">
                    {activeTab === 'dashboard' && (
                        <motion.div
                            key="dashboard"
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -16 }}
                            className="space-y-8"
                        >
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
                                <MetricCard label="Total Products" value={stats?.totalProducts || 0} tone="cyan" />
                                <MetricCard label="Total Orders" value={stats?.totalOrders || 0} tone="gold" />
                                <MetricCard label="New Orders" value={newOrders.length} tone="rose" />
                                <MetricCard label="Delivered" value={stats?.deliveredOrders || 0} tone="green" />
                                <MetricCard label="Messages" value={messageStats?.unreadMessages || 0} tone="amber" />
                            </div>

                            <div className="grid gap-6 xl:grid-cols-2">
                                <OrderSection
                                    title="New Orders"
                                    subtitle="Pending, accepted, preparing, and ready orders"
                                    orders={newOrders}
                                    emptyText="No new orders right now"
                                    selectedOrderId={selectedOrderId}
                                    newStatus={newStatus}
                                    setNewStatus={setNewStatus}
                                    onEditStatus={openStatusEditor}
                                    onCancelStatus={() => setSelectedOrderId(null)}
                                    onSaveStatus={handleUpdateStatus}
                                />
                                <OrderSection
                                    title="Delivered Orders"
                                    subtitle="Completed deliveries for quick review"
                                    orders={deliveredOrders}
                                    emptyText="No delivered orders yet"
                                    selectedOrderId={selectedOrderId}
                                    newStatus={newStatus}
                                    setNewStatus={setNewStatus}
                                    onEditStatus={openStatusEditor}
                                    onCancelStatus={() => setSelectedOrderId(null)}
                                    onSaveStatus={handleUpdateStatus}
                                    compact
                                />
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'products' && (
                        <motion.div
                            key="products"
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -16 }}
                        >
                            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold text-white">Product Management</h2>
                                    <p className="mt-1 text-sm text-cream-300">Keep stock, pricing, and availability fresh.</p>
                                </div>
                                <button
                                    onClick={handleAddNewProduct}
                                    className="rounded-md bg-gold-400 px-5 py-3 font-bold text-gray-950 transition hover:bg-gold-300"
                                >
                                    Add Product
                                </button>
                            </div>

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                                {products.length === 0 ? (
                                    <EmptyState title="No products yet" message="Add your first sweet to start selling." />
                                ) : (
                                    products.map((product) => (
                                        <ProductTile
                                            key={product._id}
                                            product={product}
                                            onEdit={handleEditProduct}
                                            onDelete={handleDeleteProduct}
                                            onToggleAvailability={handleToggleAvailability}
                                        />
                                    ))
                                )}
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'orders' && (
                        <motion.div
                            key="orders"
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -16 }}
                            className="space-y-6"
                        >
                            <OrderSection
                                title="New Orders"
                                subtitle="Move each order through the kitchen workflow"
                                orders={newOrders}
                                emptyText="No new orders waiting"
                                selectedOrderId={selectedOrderId}
                                newStatus={newStatus}
                                setNewStatus={setNewStatus}
                                onEditStatus={openStatusEditor}
                                onCancelStatus={() => setSelectedOrderId(null)}
                                onSaveStatus={handleUpdateStatus}
                            />
                            <OrderSection
                                title="Delivered Orders"
                                subtitle="Finished orders separated from active work"
                                orders={deliveredOrders}
                                emptyText="Delivered orders will appear here"
                                selectedOrderId={selectedOrderId}
                                newStatus={newStatus}
                                setNewStatus={setNewStatus}
                                onEditStatus={openStatusEditor}
                                onCancelStatus={() => setSelectedOrderId(null)}
                                onSaveStatus={handleUpdateStatus}
                                compact
                            />
                            {cancelledOrders.length > 0 && (
                                <OrderSection
                                    title="Cancelled Orders"
                                    subtitle="Kept separate so the active queue stays clean"
                                    orders={cancelledOrders}
                                    emptyText=""
                                    selectedOrderId={selectedOrderId}
                                    newStatus={newStatus}
                                    setNewStatus={setNewStatus}
                                    onEditStatus={openStatusEditor}
                                    onCancelStatus={() => setSelectedOrderId(null)}
                                    onSaveStatus={handleUpdateStatus}
                                    compact
                                />
                            )}
                        </motion.div>
                    )}

                    {activeTab === 'messages' && (
                        <motion.div
                            key="messages"
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -16 }}
                            className="space-y-6"
                        >
                            <motion.section className="border border-white/10 bg-white/[0.06] p-6 shadow-2xl backdrop-blur rounded-lg">
                                <h2 className="text-3xl font-bold text-gold-400 mb-6">Customer Messages</h2>
                                
                                {messages.length === 0 ? (
                                    <p className="text-cream-200 text-center py-8">No messages yet</p>
                                ) : (
                                    <div className="space-y-4">
                                        {messages.map((msg) => (
                                            <motion.div
                                                key={msg._id}
                                                whileHover={{ scale: 1.01 }}
                                                className={`p-6 rounded-lg border-2 transition ${
                                                    msg.status === 'unread'
                                                        ? 'bg-gold-400/10 border-gold-400 shadow-lg'
                                                        : 'bg-gray-800/50 border-gray-600'
                                                }`}
                                            >
                                                <div className="flex justify-between items-start mb-4">
                                                    <div>
                                                        <h3 className="text-xl font-bold text-gold-400">{msg.name}</h3>
                                                        <p className="text-cream-200 text-sm">{msg.email}</p>
                                                        {msg.phone && <p className="text-cream-200 text-sm">📱 {msg.phone}</p>}
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                                            msg.status === 'unread' ? 'bg-gold-500 text-gray-900' :
                                                            msg.status === 'read' ? 'bg-blue-500 text-white' :
                                                            'bg-green-500 text-white'
                                                        }`}>
                                                            {msg.status === 'unread' ? '🔴 New' : msg.status === 'read' ? '👀 Read' : '✅ Replied'}
                                                        </span>
                                                    </div>
                                                </div>
                                                <p className="text-cream-100 mb-4">{msg.message}</p>
                                                <p className="text-cream-300 text-xs">
                                                    {new Date(msg.createdAt).toLocaleString()}
                                                </p>
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                            </motion.section>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <AnimatePresence>
                {showProductForm && (
                    <ProductFormModal
                        formData={formData}
                        setFormData={setFormData}
                        editingProduct={editingProduct}
                        onSave={handleSaveProduct}
                        onClose={() => setShowProductForm(false)}
                    />
                )}
            </AnimatePresence>
        </div>
    )
}

function SweetVideoLoop({ orderCount, deliveredCount }) {
    return (
        <div className="owner-video-loop">
            <div className="video-topbar">
                <span>Live Kitchen</span>
                <span>{orderCount} active</span>
            </div>

            <div className="oven-glow" />
            <div className="steam steam-one" />
            <div className="steam steam-two" />
            <div className="steam steam-three" />

            <div className="shelf shelf-one" />
            <div className="shelf shelf-two" />

            <div className="sweet sweet-one" />
            <div className="sweet sweet-two" />
            <div className="sweet sweet-three" />
            <div className="sweet sweet-four" />

            <div className="ticket ticket-one">
                <span>NEW</span>
                <strong>{orderCount}</strong>
            </div>
            <div className="ticket ticket-two">
                <span>DONE</span>
                <strong>{deliveredCount}</strong>
            </div>

            <div className="conveyor">
                <span />
                <span />
                <span />
                <span />
            </div>
        </div>
    )
}

function TabButton({ active, onClick, children }) {
    return (
        <button
            onClick={onClick}
            className={`rounded-md border px-5 py-3 text-sm font-bold transition ${
                active
                    ? 'border-gold-300 bg-gold-400 text-gray-950 shadow-lg shadow-gold-500/20'
                    : 'border-white/10 bg-white/[0.06] text-cream-100 hover:border-gold-300/60 hover:text-white'
            }`}
        >
            {children}
        </button>
    )
}

function SummaryPill({ label, value }) {
    return (
        <div className="rounded-lg border border-white/10 bg-gray-950/50 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cream-300">{label}</p>
            <p className="mt-2 text-2xl font-bold text-white">{value}</p>
        </div>
    )
}

function MetricCard({ label, value, tone }) {
    const toneClass = {
        cyan: 'from-cyan-300 to-sky-500',
        gold: 'from-gold-300 to-gold-500',
        rose: 'from-rose-300 to-pink-500',
        green: 'from-emerald-300 to-green-500',
        violet: 'from-violet-300 to-indigo-500'
    }[tone]

    return (
        <div className="rounded-lg border border-white/10 bg-white/[0.06] p-5 shadow-xl">
            <div className={`mb-5 h-1.5 w-16 rounded-full bg-gradient-to-r ${toneClass}`} />
            <p className="text-sm font-semibold text-cream-300">{label}</p>
            <p className="mt-3 text-3xl font-bold text-white">{value}</p>
        </div>
    )
}

function OrderSection({
    title,
    subtitle,
    orders,
    emptyText,
    selectedOrderId,
    newStatus,
    setNewStatus,
    onEditStatus,
    onCancelStatus,
    onSaveStatus,
    compact = false
}) {
    return (
        <section className="rounded-lg border border-white/10 bg-white/[0.06] p-5 shadow-xl">
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white">{title}</h2>
                    <p className="mt-1 text-sm text-cream-300">{subtitle}</p>
                </div>
                <span className="w-fit rounded-full border border-gold-300/40 bg-gold-300/10 px-3 py-1 text-sm font-bold text-gold-200">
                    {orders.length}
                </span>
            </div>

            {orders.length === 0 ? (
                <EmptyState title={emptyText} message="The order list will update after refresh." />
            ) : (
                <div className={compact ? 'grid gap-4 lg:grid-cols-2' : 'grid gap-4'}>
                    {orders.map((order) => (
                        <OrderCard
                            key={order._id}
                            order={order}
                            selectedOrderId={selectedOrderId}
                            newStatus={newStatus}
                            setNewStatus={setNewStatus}
                            onEditStatus={onEditStatus}
                            onCancelStatus={onCancelStatus}
                            onSaveStatus={onSaveStatus}
                        />
                    ))}
                </div>
            )}
        </section>
    )
}

function OrderCard({
    order,
    selectedOrderId,
    newStatus,
    setNewStatus,
    onEditStatus,
    onCancelStatus,
    onSaveStatus
}) {
    const isEditing = selectedOrderId === order._id
    const orderDate = order.createdAt
        ? new Date(order.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
        : 'No date'

    return (
        <article className="rounded-lg border border-white/10 bg-gray-950/55 p-4 transition hover:border-gold-300/40">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-300">
                        Order #{order._id?.slice(-6).toUpperCase()}
                    </p>
                    <h3 className="mt-2 text-lg font-bold text-white">{order.user_id?.name || 'Unknown Customer'}</h3>
                    <p className="mt-1 text-sm text-cream-300">{orderDate}</p>
                </div>
                <span className={`w-fit rounded-full border px-3 py-1 text-xs font-bold ${statusStyles[order.status] || 'bg-gray-500 text-white border-gray-300'}`}>
                    {order.status}
                </span>
            </div>

            <div className="grid gap-3 text-sm text-cream-200 sm:grid-cols-3">
                <InfoBlock label="Items" value={getItemSummary(order)} />
                <InfoBlock label="Total" value={`₹${order.total_amount || 0}`} strong />
                <InfoBlock label="Contact" value={order.user_id?.phone || order.user_id?.email || 'Not added'} />
            </div>

            <div className="mt-4 border-t border-white/10 pt-4">
                {isEditing ? (
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <select
                            value={newStatus}
                            onChange={(e) => setNewStatus(e.target.value)}
                            className="min-h-11 flex-1 rounded-md border border-gold-300/40 bg-gray-900 px-3 py-2 text-sm text-cream-50 outline-none focus:border-gold-300"
                        >
                            <option value="">Select status</option>
                            {statuses.map((status) => (
                                <option key={status} value={status}>{status}</option>
                            ))}
                        </select>
                        <button
                            onClick={() => onSaveStatus(order._id, newStatus)}
                            className="rounded-md bg-emerald-400 px-4 py-2 text-sm font-bold text-gray-950 transition hover:bg-emerald-300"
                        >
                            Save
                        </button>
                        <button
                            onClick={onCancelStatus}
                            className="rounded-md border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-bold text-cream-100 transition hover:border-rose-300/60"
                        >
                            Cancel
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => onEditStatus(order)}
                        className="rounded-md bg-gold-400 px-4 py-2 text-sm font-bold text-gray-950 transition hover:bg-gold-300"
                    >
                        Update Status
                    </button>
                )}
            </div>
        </article>
    )
}

function InfoBlock({ label, value, strong = false }) {
    return (
        <div className="min-w-0 rounded-md bg-white/[0.04] px-3 py-2">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cream-400">{label}</p>
            <p className={`mt-1 break-words ${strong ? 'text-lg font-bold text-gold-300' : 'text-cream-100'}`}>
                {value}
            </p>
        </div>
    )
}

function ProductTile({ product, onEdit, onDelete, onToggleAvailability }) {
    const isAvailable = product.is_available !== false

    return (
        <article className="rounded-lg border border-white/10 bg-white/[0.06] p-5 shadow-xl transition hover:border-gold-300/40">
            <div className="mb-4 flex items-start justify-between gap-4">
                <div className="min-w-0">
                    <h3 className="break-words text-xl font-bold text-white">{product.name}</h3>
                    <p className="mt-1 text-sm text-cream-300">{product.category || 'General'}</p>
                </div>
                <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${isAvailable ? 'bg-emerald-400 text-gray-950' : 'bg-rose-500 text-white'}`}>
                    {isAvailable ? 'Available' : 'Unavailable'}
                </span>
            </div>

            {product.image && (
                <div className="mb-4 h-32 overflow-hidden rounded-lg bg-gray-900">
                    <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                </div>
            )}

            <p className="mb-5 min-h-12 text-sm leading-6 text-cream-200">
                {product.description || 'No description added.'}
            </p>

            <div className="mb-5 grid grid-cols-2 gap-3 text-sm">
                <InfoBlock label="Price" value={`₹${product.price || 0}`} strong />
                <InfoBlock label="Stock" value={product.stock ?? 0} />
            </div>

            <div className="flex flex-col gap-2">
                <div className="flex gap-3">
                    <button
                        onClick={() => onEdit(product)}
                        className="flex-1 rounded-md bg-sky-400 px-3 py-2 text-sm font-bold text-gray-950 transition hover:bg-sky-300"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => onDelete(product._id)}
                        className="flex-1 rounded-md bg-rose-500 px-3 py-2 text-sm font-bold text-white transition hover:bg-rose-400"
                    >
                        Delete
                    </button>
                </div>
                <button
                    onClick={() => onToggleAvailability(product._id, isAvailable)}
                    className={`w-full rounded-md px-3 py-2 text-sm font-bold transition ${
                        isAvailable
                            ? 'bg-amber-500 text-gray-950 hover:bg-amber-400'
                            : 'bg-emerald-500 text-white hover:bg-emerald-400'
                    }`}
                >
                    {isAvailable ? 'Mark Unavailable' : 'Mark Available'}
                </button>
            </div>
        </article>
    )
}

function ProductFormModal({ formData, setFormData, editingProduct, onSave, onClose }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
        >
            <motion.div
                initial={{ scale: 0.96, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.96, y: 20 }}
                className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg border border-white/10 bg-gray-950 p-6 shadow-2xl"
            >
                <div className="mb-6 flex items-start justify-between gap-4">
                    <div>
                        <h3 className="text-2xl font-bold text-white">
                            {editingProduct ? 'Edit Product' : 'Add New Product'}
                        </h3>
                        <p className="mt-1 text-sm text-cream-300">Update the product details shown to customers.</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="rounded-md border border-white/10 px-3 py-2 text-sm font-bold text-cream-100 transition hover:border-gold-300/60"
                    >
                        Close
                    </button>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Product Name">
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="dashboard-input"
                            placeholder="Enter product name"
                        />
                    </Field>

                    <Field label="Price">
                        <input
                            type="number"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            className="dashboard-input"
                            placeholder="Enter price"
                        />
                    </Field>

                    <Field label="Stock">
                        <input
                            type="number"
                            value={formData.stock}
                            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                            className="dashboard-input"
                            placeholder="Enter stock quantity"
                        />
                    </Field>

                    <Field label="Category">
                        <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="dashboard-input"
                        >
                            {categoryOptions.map((category) => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </Field>
                </div>

                <Field label="Description" className="mt-4">
                    <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="dashboard-input min-h-24"
                        placeholder="Enter product description"
                    />
                </Field>

                <Field label="Product Image" className="mt-4">
                    <div className="flex gap-3">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                            className="dashboard-input flex-1"
                        />
                    </div>
                    {formData.image && (
                        <div className="mt-3 flex items-center gap-3">
                            {typeof formData.image === 'string' ? (
                                <>
                                    <img src={formData.image} alt="preview" className="h-16 w-16 rounded-lg object-cover" />
                                    <span className="text-sm text-cream-200">Current image</span>
                                </>
                            ) : (
                                <>
                                    <img src={URL.createObjectURL(formData.image)} alt="preview" className="h-16 w-16 rounded-lg object-cover" />
                                    <span className="text-sm text-cream-200">{formData.image.name}</span>
                                </>
                            )}
                        </div>
                    )}
                </Field>

                <label className="mt-5 flex w-fit items-center gap-3 rounded-md border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-cream-100">
                    <input
                        type="checkbox"
                        checked={formData.is_available}
                        onChange={(e) => setFormData({ ...formData, is_available: e.target.checked })}
                        className="h-4 w-4 accent-gold-400"
                    />
                    Available for customers
                </label>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <button
                        onClick={onSave}
                        className="flex-1 rounded-md bg-emerald-400 px-4 py-3 font-bold text-gray-950 transition hover:bg-emerald-300"
                    >
                        Save Product
                    </button>
                    <button
                        onClick={onClose}
                        className="flex-1 rounded-md border border-white/10 bg-white/[0.06] px-4 py-3 font-bold text-cream-100 transition hover:border-rose-300/60"
                    >
                        Cancel
                    </button>
                </div>
            </motion.div>
        </motion.div>
    )
}

function Field({ label, children, className = '' }) {
    return (
        <label className={`block ${className}`}>
            <span className="mb-2 block text-sm font-semibold text-cream-200">{label}</span>
            {children}
        </label>
    )
}

function EmptyState({ title, message }) {
    return (
        <div className="col-span-full rounded-lg border border-dashed border-white/15 bg-white/[0.03] px-5 py-8 text-center">
            <p className="text-lg font-bold text-white">{title}</p>
            <p className="mt-2 text-sm text-cream-300">{message}</p>
        </div>
    )
}

function getItemSummary(order) {
    const items = order.items || []
    if (items.length === 0) return 'No items'

    const names = items
        .slice(0, 2)
        .map((item) => `${item.product_id?.name || 'Product'} x${item.quantity}`)
        .join(', ')

    return items.length > 2 ? `${names} +${items.length - 2} more` : names
}
