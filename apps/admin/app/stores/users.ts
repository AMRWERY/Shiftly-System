import { defineStore } from 'pinia'
import type { UserListItem, UserRole, InviteUserData } from '../../../../layers/base/types'

interface UsersState {
  users: UserListItem[]
  loading: boolean
  error: string | null
  selectedRole: UserRole | 'all'
}

export const useUsersStore = defineStore('users', {
  state: (): UsersState => ({
    users: [],
    loading: false,
    error: null,
    selectedRole: 'all',
  }),

  getters: {
    // Get filtered users (excluding admins and filtered by role)
    filteredUsers: (state): UserListItem[] => {
      let filtered = state.users.filter((user: UserListItem) => user.role !== 'admin')
      
      if (state.selectedRole !== 'all') {
        filtered = filtered.filter((user: UserListItem) => user.role === state.selectedRole)
      }
      
      return filtered
    },

    // Get user by ID
    getUserById: (state) => (id: string): UserListItem | undefined => {
      return state.users.find(user => user.id === id)
    },

    // Get users by status
    getUsersByStatus: (state) => (status: 'active' | 'pending' | 'blocked'): UserListItem[] => {
      return state.users.filter((user: UserListItem) => user.status === status)
    },
  },

  actions: {
    // Fetch all users
    async fetchUsers() {
      this.loading = true
      this.error = null

      try {
        const data = await $fetch<UserListItem[]>('/api/admin/users')
        this.users = data || []
      } catch (err: any) {
        this.error = err.message
        console.error('Error fetching users:', err)
        throw err
      } finally {
        this.loading = false
      }
    },

    // Block a user
    async blockUser(userId: string) {
      try {
        // Optimistic update
        const userIndex = this.users.findIndex((u: UserListItem) => u.id === userId)
        if (userIndex !== -1) {
          const user = this.users[userIndex]
          if (user) {
            const previousStatus = user.status
            user.status = 'blocked'

            try {
              await $fetch(`/api/admin/users/${userId}`, {
                method: 'PATCH',
              })

              return { success: true, message: 'User blocked successfully' }
            } catch (err: any) {
              // Revert on error
              user.status = previousStatus
              throw err
            }
          }
        }
      } catch (err: any) {
        console.error('Error blocking user:', err)
        throw err
      }
    },

    // Unblock a user
    async unblockUser(userId: string) {
      try {
        // Optimistic update
        const userIndex = this.users.findIndex((u: UserListItem) => u.id === userId)
        if (userIndex !== -1) {
          const user = this.users[userIndex]
          if (user) {
            const previousStatus = user.status
            user.status = 'active'

            try {
              await $fetch(`/api/admin/users/${userId}`, {
                method: 'PATCH',
              })

              return { success: true, message: 'User unblocked successfully' }
            } catch (err: any) {
              // Revert on error
              user.status = previousStatus
              throw err
            }
          }
        }
      } catch (err: any) {
        console.error('Error unblocking user:', err)
        throw err
      }
    },

    // Delete a user
    async deleteUser(userId: string) {
      try {
        await $fetch(`/api/admin/users/${userId}`, {
          method: 'DELETE',
        })

        // Remove from local state
        this.users = this.users.filter((u: UserListItem) => u.id !== userId)

        return { success: true, message: 'User deleted successfully' }
      } catch (err: any) {
        console.error('Error deleting user:', err)
        throw err
      }
    },

    // Invite a new user
    async inviteUser(userData: InviteUserData) {
      try {
        const data = await $fetch<UserListItem>('/api/admin/users/invite', {
          method: 'POST',
          body: userData,
        })

        // Add to local state
        if (data) {
          this.users.unshift(data)
        }

        return { success: true, data, message: 'User invited successfully' }
      } catch (err: any) {
        console.error('Error inviting user:', err)
        throw err
      }
    },

    // Set selected role filter
    setSelectedRole(role: UserRole | 'all') {
      this.selectedRole = role
    },

    // Fetch single user
    async fetchUser(id: string) {
      this.loading = true
      this.error = null

      try {
        const data = await $fetch<UserListItem>(`/api/admin/users/${id}`)
        
        // Update user in list if exists, otherwise add to list
        const index = this.users.findIndex(u => u.id === id)
        if (index !== -1) {
          this.users[index] = data
        } else {
          this.users.push(data)
        }
        
        return data
      } catch (err: any) {
        this.error = err.message
        console.error('Error fetching user:', err)
        throw err
      } finally {
        this.loading = false
      }
    },
  },
})
