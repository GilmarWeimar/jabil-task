using Backend.Dtos;

namespace Backend.Services
{
    public interface ITaskService
    {
        Task<(IEnumerable<TaskResponseDto> data, int total)> GetAllAsync(
            int page,
            int pageSize,
            string? status,
            string? priority
        );
        Task<TaskResponseDto?> GetByIdAsync(Guid id);
        Task<TaskResponseDto> CreateAsync(CreateTaskDto dto);
        Task<bool> UpdateAsync(Guid id, UpdateTaskDto dto);
        Task<bool> DeleteAsync(Guid id);
    }
}