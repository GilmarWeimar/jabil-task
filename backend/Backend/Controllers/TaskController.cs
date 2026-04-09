using Backend.Dtos;
using Backend.Services;
using Backend.Common;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/task")]
    [Produces("application/json")]
    public class TaskController : ControllerBase
    {
        private readonly ITaskService _taskService;

        public TaskController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        [HttpGet]
        public async Task<ActionResult<ApiResponse<object>>> GetAll(
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 10,
            [FromQuery] string? status = null,
            [FromQuery] string? priority = null
        )
        {
            var (tasks, total) = await _taskService.GetAllAsync(page, pageSize, status, priority);

            var response = new
            {
                page,
                pageSize,
                total,
                data = tasks
            };

            return Ok(new ApiResponse<object>(response));
        }

        [HttpGet("{id:guid}")]
        public async Task<ActionResult<ApiResponse<TaskResponseDto>>> GetById(Guid id)
        {
            var task = await _taskService.GetByIdAsync(id);

            if (task == null)
                return NotFound(new ApiResponse<TaskResponseDto?>(null, false, "Task not found."));

            return Ok(new ApiResponse<TaskResponseDto>(task));
        }

        [HttpPost]
        public async Task<ActionResult<ApiResponse<TaskResponseDto>>> Create([FromBody] CreateTaskDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(new ApiResponse<TaskResponseDto?>(null, false, "Invalid data."));

            var createdTask = await _taskService.CreateAsync(dto);

            return CreatedAtAction(
                nameof(GetById),
                new { id = createdTask.Id },
                new ApiResponse<TaskResponseDto>(createdTask)
            );
        }

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] UpdateTaskDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(new ApiResponse<object?>(null, false, "Invalid data."));

            var updated = await _taskService.UpdateAsync(id, dto);

            if (!updated)
                return NotFound(new ApiResponse<object?>(null, false, "Task not found."));

            return NoContent();
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var deleted = await _taskService.DeleteAsync(id);

            if (!deleted)
                return NotFound(new ApiResponse<object?>(null, false, "Task not found."));

            return NoContent();
        }
    }
}